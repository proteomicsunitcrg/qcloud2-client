import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SampleTypeCategory } from '../../../models/sampleTypeCategory';
import { ActivatedRoute } from '@angular/router';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { FileService } from '../../../services/file.service';
import { PlotService } from '../../../services/plot.service';
import { Subscription } from 'rxjs';
import { File } from '../../../models/file';
import * as Plotly from 'plotly.js/dist/plotly';
import * as pako from 'pako';
declare var M: any;
@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.css']
})
/**
 * Displays per-file information. Currently: the "Total Ion Current view" -
 * a lazy collapsible (same pattern as the isotopologue "Single file view")
 * that only fetches and renders the full TIC curve when the user opens it.
 * The curve of the selected file is fetched by checksum (plot click or the
 * last file of the tab's default sample type) and plotted with decimation,
 * so the page is never loaded with the (up to 100k+) series points upfront.
 *
 * Both the collapsible and the plot div are referenced via @ViewChild
 * (NOT element ids): one panel instance is rendered per tab and all loaded
 * tabs coexist in the DOM, so any id-based lookup (document.getElementById,
 * Plotly by id) would hit the first tab's element instead of this one.
 */
export class FileInformationComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private sampleTypeService: SampleTypeService,
    private fileService: FileService,
    private plotService: PlotService) { }

  @Input() sampleTypeCategory: SampleTypeCategory;

  @ViewChild('ticCollapsible', { static: false }) private ticCollapsibleRef: ElementRef;
  @ViewChild('ticplot', { static: false }) private ticPlotRef: ElementRef;

  private sampleType: SampleType;

  file: File;

  /**
   * Local open state. Deliberately NOT routed through
   * plotService.collapsibleOpened$ - that signal belongs to the isotopologue
   * panel and sharing it would open/close both panels together.
   */
  isCollapsibleOpen = false;

  loading = false;

  /** null | 'nofile' | 'notfound' | 'decode' | 'http' */
  error: string = null;

  private series: number[][] = null;

  plotFile$: Subscription;

  collapsible: any;

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (params.type === 'instrument') {
          this.loadLastFile(params.apiKey);
        }
      });
    this.subscribeToPlotFile();
  }

  ngAfterViewInit() {
    // M.Collapsible must be initialized here (not in ngOnInit): the
    // template's own view - and any property binding on it - only exists
    // once the view has been rendered.
    this.enableCollapsible();
  }

  private enableCollapsible(): void {
    const elem = this.ticCollapsibleRef ? this.ticCollapsibleRef.nativeElement : null;
    if (elem === null || elem === undefined) {
      return;
    }
    this.collapsible = M.Collapsible.init(elem, {
      onOpenEnd: () => {
        this.isCollapsibleOpen = true;
        this.loadTic();
      },
      onCloseEnd: () => {
        this.isCollapsibleOpen = false;
        this.cleanupPlot();
      }
    });
  }

  private subscribeToPlotFile(): void {
    // A plot click carries the file checksum; resolve it to the FULL file so
    // the panel knows the file name for the title. (The /api/file/name/
    // endpoint only returns the checksum back, which made the title show the
    // checksum instead of the file name.)
    //
    // fileChecksum$ is a page-wide broadcast: every tab's panel instance
    // receives every plot click. Accept it only when the clicked file belongs
    // to THIS panel's sample type category - otherwise a click on another tab
    // would steal the file and render the plot while this tab is hidden
    // (zero-width container, plot squashed to the right).
    this.plotFile$ = this.plotService.fileChecksum$
      .subscribe(
        (checksum) => {
          this.fileService.getFileByChecksum(checksum)
            .subscribe(
              (file) => {
                if (!this.clickBelongsToThisTab(file)) {
                  return;
                }
                this.file = file;
                if (this.isCollapsibleOpen) {
                  this.loadTic();
                }
              }, err => console.log(err)
            );
        }
      );
  }

  private clickBelongsToThisTab(file: File): boolean {
    const st = file && file.sampleType;
    const types = this.sampleTypeCategory && this.sampleTypeCategory.sampleTypes;
    if (!st || !types || types.length === 0) {
      return true; // no category info on either side: keep previous behavior
    }
    return types.some(
      (t) => t.id === st.id
        || t.qualityControlControlledVocabulary === st.qualityControlControlledVocabulary
    );
  }

  /** True while the tab's last file (the default selection) is resolving. */
  private lastFileLoading = false;

  private loadLastFile(apikey: string): void {
    this.lastFileLoading = true;
    this.sampleTypeService.getDefaultSampleTypeBySampleTypeCategory(this.sampleTypeCategory)
      .subscribe(
        (sampleType) => {
          this.sampleType = sampleType;
        }, err => {
          console.log(err);
          this.lastFileLoading = false;
          if (this.isCollapsibleOpen) {
            this.loadTic();
          }
        },
        () => {
          this.fileService.getLastFileBySampleTypeAndLabSystem(this.sampleType, apikey)
            .subscribe(
              (file) => {
                this.file = file;
                this.lastFileLoading = false;
                if (this.isCollapsibleOpen) {
                  this.loadTic();
                }
              }, err => {
                console.log(err);
                this.lastFileLoading = false;
                if (this.isCollapsibleOpen) {
                  this.loadTic();
                }
              }
            );
        }
      );
  }

  private loadTic(): void {
    this.cleanupPlot();
    this.loading = false;
    if (this.file === null || this.file === undefined || !this.file.checksum) {
      // Default selection (the tab's last file) may still be resolving.
      if (this.lastFileLoading) {
        this.error = null;
        this.loading = true;
      } else {
        this.error = 'nofile';
      }
      return;
    }
    this.loading = true;
    this.error = null;
    const checksum = this.file.checksum;
    this.fileService.getTicByChecksum(checksum)
      .subscribe(
        (raw: string) => {
          if (this.file === null || this.file.checksum !== checksum) {
            return; // a newer file was selected meanwhile
          }
          try {
            this.series = this.decodeTic(raw);
          } catch (e) {
            this.series = null;
            this.loading = false;
            this.error = 'decode';
            return;
          }
          this.loading = false;
          // Wait for the *ngIf to render the plot div before Plotly.react
          setTimeout(() => {
            if (this.series !== null) {
              this.renderPlot();
            }
          }, 0);
        },
        (err) => {
          console.error('[TIC] ERR', {
            status: err && err.status,
            url: err && err.url,
            name: err && err.name,
            error: err && err.error
          });
          this.series = null;
          this.loading = false;
          this.error = (err && err.status === 404) ? 'notfound' : 'http';
        }
      );
  }

  /**
   * Decodes the stored blob: "gz1:" + base64(gzip(JSON [[rt_ms, msLevel, tic], ...]))
   */
  private decodeTic(raw: string): number[][] {
    if (typeof raw !== 'string' || raw.indexOf('gz1:') !== 0) {
      throw new Error('unexpected TIC format');
    }
    const bin = atob(raw.substring(4));
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      u8[i] = bin.charCodeAt(i);
    }
    const json = pako.ungzip(u8, { to: 'string' });
    const pts = JSON.parse(json);
    if (!Array.isArray(pts)) {
      throw new Error('unexpected TIC payload');
    }
    return pts;
  }

  /**
   * Min/max per pixel-bucket decimation: keeps the visible peaks (what
   * matters for a TIC eyeball check) while capping the plotted point count.
   */
  private decimateForDisplay(pts: number[][], target: number): number[][] {
    if (pts.length <= target) {
      return pts;
    }
    const out: number[][] = [];
    const bucket = pts.length / target;
    for (let i = 0; i < target; i++) {
      const start = Math.floor(i * bucket);
      const end = Math.min(pts.length, Math.floor((i + 1) * bucket));
      if (start >= end) {
        continue;
      }
      let min = pts[start];
      let max = pts[start];
      for (let j = start + 1; j < end; j++) {
        if (pts[j][2] < min[2]) {
          min = pts[j];
        }
        if (pts[j][2] > max[2]) {
          max = pts[j];
        }
      }
      out.push(min, max);
    }
    return out;
  }

  private renderPlot(): void {
    const pts = this.decimateForDisplay(this.series, 4000);
    let maxTic = 0;
    for (const p of pts) {
      if (p[2] > maxTic) {
        maxTic = p[2];
      }
    }
    const x: number[] = [];
    const y: number[] = [];
    for (const p of pts) {
      x.push(p[0] / 60000); // rt ms -> min
      y.push(maxTic > 0 ? p[2] / maxTic * 100 : 0); // relative abundance, base peak = 100
    }
    const trace = {
      x: x,
      y: y,
      type: 'scatter',
      mode: 'lines',
      line: { width: 1 },
      name: 'TIC'
    };
    const layout = {
      title: { text: 'Total Ion Current - ' + (this.file.filename || this.file.checksum) },
      xaxis: { title: { text: 'Time (min)' } },
      yaxis: { type: 'linear', range: [0, 100], title: { text: 'Relative abundance' } },
      margin: { l: 70, r: 20, t: 40, b: 45 },
      hovermode: 'x unified'
    };
    Plotly.react(this.ticPlotRef.nativeElement, [trace], layout);
  }

  private cleanupPlot(): void {
    if (this.ticPlotRef && this.ticPlotRef.nativeElement) {
      Plotly.purge(this.ticPlotRef.nativeElement);
    }
    this.series = null;
  }

  ngOnDestroy() {
    this.plotFile$.unsubscribe();
    this.cleanupPlot();
  }

}
