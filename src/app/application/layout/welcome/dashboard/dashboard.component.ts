import { Component, OnDestroy, OnInit } from '@angular/core';
import { System } from '../../../../models/system';
import { SystemService } from '../../../../services/system.service';
import { FileService } from '../../../../services/file.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FileIntranetService } from '../../../../services/file-intranet.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { WebsocketService } from '../../../../services/websocket.service';
import { Router } from '@angular/router';
import { File } from '../../../../models/file';
import { ContextSourceService } from '../../../../services/context-source.service';
import { SampleCompositionService } from '../../../../services/sample-composition.service';
import { SampleTypeService } from '../../../../services/sample-type.service';
import { SampleType } from '../../../../models/sampleType';
import { Summary } from '../../../../models/summary';

declare var M: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Any context source carrying at least one of these is a peptide, everything
  // else (Median IT, Sum TIC, FWHM...) is an instrument-level metric.
  private static readonly PEPTIDE_PARAM_NAMES = ['Peak area', 'Mass accuracy', 'Retention time'];

  // Units must match the chart titles exactly (those rule) - see "Total Ion
  // Current (sum) x1e10", "Median mass accuracy MS1 (ppm)", "FWHM (sec/scans)".
  private static readonly PARAM_UNITS: { [paramName: string]: string } = {
    'Peak area': 'log2',
    'Mass accuracy': 'ppm',
    'Retention time': 'min',
    'Median mass accuracy': 'ppm',
    'Median IT': 'ms',
    'Total Ion Current': 'x1e10',
    'FWHM (scans)': 'scans',
    'FWHM (sec)': 'sec',
  };

  // Display-only override: the backend's real param name ("Retention time",
  // matched against by isPeptideSummary/getDataFromParam/mountPeptideCSV
  // above) must stay unchanged, but the column header shown to users should
  // read "Retention time drift" to avoid implying an absolute retention time.
  private static readonly DISPLAY_NAMES: { [paramName: string]: string } = {
    'Retention time': 'Retention time drift',
  };

  constructor(private fileService: FileService, private systemService: SystemService, public ngxSmartModalService: NgxSmartModalService,
    private fileIntranetService: FileIntranetService, private webSocketService: WebsocketService, private routerService: Router, private contextSourceService: ContextSourceService,
    private sampleCompositionService: SampleCompositionService, private sampleTypeService: SampleTypeService
  ) { }

  // Explicit id: ngx-pagination's PaginationService is a global singleton
  // keyed by id (defaulting all instances to the same shared entry) - since
  // this tab and pipeline-status now stay mounted together (CSS-toggled
  // tabs, not *ngIf), their two paginators would otherwise clobber each
  // other's state.
  config = {
    id: 'filesPagination',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  filename = '';
  labsystem = '';
  sampleType = '';

  collection = { count: 0, data: [] };

  labSystems: System[] = [];

  sampleTypes: SampleType[] = [];

  fileData = [];

  dashboardSubscription: Subscription;

  private filenameChanges = new Subject<string>();
  private filenameChangesSubscription: Subscription;

  peptideSummaries: Summary[] = [];

  peptideColumns: string[] = [];

  globalSummaries: Summary[] = [];

  ngOnInit() {
    this.getNodeLs();
    this.getSampleTypes();
    this.getPage();
    this.subscribeToDashboardIntranet();
    this.subscribeToFilenameChanges();
  }

  // Live-filters as the user types, once there's enough of a filename to
  // narrow results meaningfully (3+ chars) - clearing the field back to
  // empty also re-triggers, to show everything again.
  private subscribeToFilenameChanges(): void {
    this.filenameChangesSubscription = this.filenameChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value.length >= 3 || value.length === 0) {
        this.config.currentPage = 1;
        this.getPage();
      }
    });
  }

  public onFilenameChange(value: string): void {
    this.filenameChanges.next(value);
  }

  private getSampleTypes(): void {
    this.sampleTypeService.getSamplesTypes().subscribe(
      res => {
        this.sampleTypes = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnDestroy() {
    this.dashboardSubscription.unsubscribe();
    this.filenameChangesSubscription.unsubscribe();
  }

  public getPage(): void {
    this.fileService.getAllFilesByNode(this.config.currentPage - 1, this.config.itemsPerPage, this.filename, this.labsystem, this.sampleType).subscribe(
      res => {
        this.collection.data = res.content;
        this.collection.count = res.totalElements;
        this.config.totalItems = res.totalElements;
        // for (const file of this.collection.data) {
        //   this.fileService.getFileStatusByChecksum(file.checksum).subscribe(
        //     res => {
        //       file.isOk = res;
        //     },
        //     err => {
        //       console.error(err);
        //     }
        //   );
        // }
      },
      err => {
        console.error(err);
      }
    );
  }

  private getNodeLs(): void {
    this.systemService.getSystems().subscribe(
      res => {
        this.labSystems = res.filter(item => item.active);
        setTimeout(() => {  // The timeout is necessary because the select isnt instant
          M.AutoInit();
        }, 500);
      },
      err => {
        console.error(err);
      }
    );
  }

  public cleanFilters(): void {
    this.filename = '';
  }

  /**
* @summary The event launched when the user changes a page
* @author Marc Serret
* @since 1.0.0
* @access public
* @param number the new page to display
*/
  public pageChanged(event: number) {
    this.config.currentPage = event;
    this.getPage();
  }


  public viewData(checksum: string): void {
    this.fileIntranetService.getFileData(checksum).subscribe(
      res => {
        this.fileData = res;
      },
      err => console.error(err)
    );
  }

  private subscribeToDashboardIntranet(): void {
    this.dashboardSubscription = this.webSocketService.updateDashboard$.subscribe(
      res => {
        this.getPage();
      },
      err => {
        console.error(err);
      }
    );
  }

  public goToPlot(file: File): void {
    this.routerService.navigate([`/application/view/instrument/`, file.labSystem.apiKey], { queryParams: { checksum: file.checksum } });
  }

  public goToResults(file: File): void {
    this.fileService.getSummary(file.checksum).subscribe(
      res => {
        this.peptideSummaries = res.filter(summary => this.isPeptideSummary(summary));
        this.globalSummaries = res.filter(summary => !this.isPeptideSummary(summary));
        this.peptideColumns = this.computeSummaryColumns(this.peptideSummaries);
        this.ngxSmartModalService.getModal('dataModal').open()
      },
      err => {
        console.error(err);
      }
    );
  }

  private isPeptideSummary(summary: Summary): boolean {
    return summary.values.some(value =>
      value.param && DashboardComponent.PEPTIDE_PARAM_NAMES.indexOf(value.param.name) !== -1);
  }

  // Not every context source has the same set of parameters (e.g. per-peptide
  // metrics like Peak area/Retention time vs. instrument-level metrics like
  // Median IT or FWHM) - so the table/TSV columns are derived from whatever
  // parameters are actually present, instead of assuming a fixed triplet.
  private computeSummaryColumns(summaries: Summary[]): string[] {
    const columns: string[] = [];
    for (const summary of summaries) {
      for (const value of summary.values) {
        const paramName = value.param ? value.param.name : null;
        if (paramName && columns.indexOf(paramName) === -1) {
          columns.push(paramName);
        }
      }
    }
    return columns;
  }

  public getSummaryValue(summary: Summary, paramName: string): any {
    const data = this.getDataFromParam(summary.values, paramName);
    return data ? data['calculatedValue'] : null;
  }

  public formatColumnHeader(paramName: string): string {
    const unit = DashboardComponent.PARAM_UNITS[paramName];
    const displayName = DashboardComponent.DISPLAY_NAMES[paramName] || paramName;
    return unit ? `${displayName} (${unit})` : displayName;
  }

  // Instrument-level metrics have a single value each - shown as "label: value" instead
  // of another sparse table.
  public formatGlobalMetric(summary: Summary): string {
    return summary.values.map(value => {
      const unit = value.param ? DashboardComponent.PARAM_UNITS[value.param.name] : undefined;
      return unit ? `${value.calculatedValue} ${unit}` : `${value.calculatedValue}`;
    }).join(', ');
  }

  // Mirrors exactly what the "Results" modal shows - same two sections, same params -
  // so the downloaded files never drift from what's displayed on screen.
  public downloadData(file: File): void {
    this.fileService.getSummary(file.checksum).subscribe(
      res => {
        const peptideSummaries = res.filter(summary => this.isPeptideSummary(summary));
        const globalSummaries = res.filter(summary => !this.isPeptideSummary(summary));
        const peptideColumns = this.computeSummaryColumns(peptideSummaries);

        this.downloadCSV(this.mountPeptideCSV(peptideSummaries, peptideColumns), file, '_peptide.tsv');
        this.downloadCSV(this.mountGlobalCSV(globalSummaries), file, '_global.tsv');
      },
      err => {
        console.error(err);
      }
    );
  }

  private mountPeptideCSV(summary: Summary[], columns: string[]): string {
    const separator = '\t';
    const headers = `sequence${separator}${columns.map(column => this.formatColumnHeader(column)).join(separator)}\n`;
    let csvText = '';
    for (const peptide of summary) {
      const values = columns.map(column => {
        const data = this.getDataFromParam(peptide.values, column);
        return data && data['calculatedValue'] !== null && data['calculatedValue'] !== undefined ? data['calculatedValue'] : '';
      });
      csvText += `${peptide.sequence}${separator}${values.join(separator)}\n`;
    }
    return headers + csvText;
  }

  private mountGlobalCSV(summaries: Summary[]): string {
    const separator = '\t';
    const headers = `metric${separator}value\n`;
    let csvText = '';
    for (const summary of summaries) {
      csvText += `${summary.sequence}${separator}${this.formatGlobalMetric(summary)}\n`;
    }
    return headers + csvText;
  }

  private downloadCSV(csv: string, file: File, suffix: string) {
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${file.filename}${suffix}`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  private getDataFromParam(valueList: any[], target: string): any {
    for (const value of valueList) {
      if (value['param']['name'] === target) {
        return value;
      }
    }
  }

}
