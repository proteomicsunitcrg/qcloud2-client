import { Component, OnDestroy, OnInit } from '@angular/core';
import { System } from '../../../models/system';
import { SystemService } from '../../../services/system.service';
import { FileService } from '../../../services/file.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FileIntranetService } from '../../../services/file-intranet.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { WebsocketService } from '../../../services/websocket.service';
import { Router } from '@angular/router';
import { ContextSourceService } from '../../../services/context-source.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';
import { Summary } from '../../../models/summary';
import { PipelineFile } from '../../../models/pipeline-file';

declare var M: any;
@Component({
  selector: 'app-pipeline-status',
  templateUrl: './pipeline-status.component.html',
  styleUrls: ['./pipeline-status.component.css']
})
export class PipelineStatusComponent implements OnInit, OnDestroy {

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

  constructor(private fileService: FileService, private systemService: SystemService, public ngxSmartModalService: NgxSmartModalService,
    private fileIntranetService: FileIntranetService, private webSocketService: WebsocketService, private routerService: Router, private contextSourceService: ContextSourceService,
    private sampleCompositionService: SampleCompositionService, private sampleTypeService: SampleTypeService
  ) { }

  // Explicit id: ngx-pagination's PaginationService is a global singleton
  // keyed by id (defaulting all instances to the same shared entry) - since
  // this tab and the Files dashboard now stay mounted together (CSS-toggled
  // tabs, not *ngIf), their two paginators would otherwise clobber each
  // other's state.
  config = {
    id: 'pipelineStatusPagination',
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

  peptideSummaries: Summary[] = [];

  peptideColumns: string[] = [];

  globalSummaries: Summary[] = [];

  selectedErrorFile: PipelineFile = null;

  private filenameChanges = new Subject<string>();
  private filenameChangesSubscription: Subscription;

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
    this.fileService.getPipelineFileDashboard(this.config.currentPage - 1, this.config.itemsPerPage, this.filename).subscribe(
      res => {
        this.collection.data = res.content;
        this.collection.count = res.totalElements;
        this.config.totalItems = res.totalElements;
      },
      err => {
        console.error(err);
      }
    );
  }

  public statusIcon(file: PipelineFile): string {
    switch (file.status) {
      case 'PROCESSED': return 'check_circle';
      case 'ERROR': return 'error';
      default: return 'hourglass_empty'; // RECEIVED / PROCESSING
    }
  }

  public goToErrorDetails(file: PipelineFile): void {
    this.selectedErrorFile = file;
    this.ngxSmartModalService.getModal('errorModal').open();
  }

  // Users only ever care about the sample name they gave the file - the
  // instrument UUID/QC code/checksum QCloud embeds in the real filename for
  // internal routing (see report_qcloud.nf's naming convention) are pipeline
  // internals, not something to show them.
  public displayFilename(file: PipelineFile): string {
    return PipelineStatusComponent.cleanFilename(file.filename);
  }

  private static cleanFilename(filename: string): string {
    if (!filename) {
      return filename;
    }
    const dotIdx = filename.indexOf('.');
    const base = dotIdx === -1 ? filename : filename.substring(0, dotIdx);
    const ext = dotIdx === -1 ? '' : filename.substring(dotIdx + 1).split('.')[0];
    // QCrawler prefixes the UUID/QC-code/checksum block with a
    // ___YYYYMMDDHHMMSS acquisition timestamp - strip that first, same as
    // submit_qcloud.nf's own cleaning logic, or it survives the UUID regex
    // below untouched.
    const withoutTimestamp = base.replace(/___[0-9]{14}/, '');
    const cleanBase = withoutTimestamp.replace(
      /_[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}.*$/, ''
    );
    return ext ? `${cleanBase}.${ext}` : cleanBase;
  }

  // Time from received to shown-as-done - what the user actually perceives
  // as "how long did this take", not the pipeline's internal compute time.
  // Pure pipeline compute time - from processingStartedDate (set by the
  // pipeline itself, MARK_PROCESSING_STARTED) to done, excluding any Slurm
  // queue wait between being received and actually starting to run. For
  // files still RECEIVED/PROCESSING this keeps growing - refreshFile() (the
  // refresh icon) is what re-samples it.
  public duration(file: PipelineFile): string {
    if (!file.processingStartedDate) {
      return file.receivedDate ? 'queued' : '';
    }
    const start = new Date(file.processingStartedDate).getTime();
    const isDone = file.status === 'PROCESSED' || file.status === 'ERROR';
    const end = isDone ? new Date(file.updatedDate).getTime() : Date.now();
    const seconds = Math.max(0, Math.round((end - start) / 1000));
    const formatted = PipelineStatusComponent.formatDuration(seconds);
    return isDone ? formatted : `${formatted} (ongoing)`;
  }

  private static formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  // Re-fetches just this one row (e.g. while it's still RECEIVED/PROCESSING)
  // instead of making the user reload the whole page/table.
  public refreshFile(file: PipelineFile): void {
    this.fileService.getPipelineFileByChecksum(file.checksum).subscribe(
      res => {
        const idx = this.collection.data.indexOf(file);
        if (idx !== -1) {
          // A new array reference (not an in-place mutation) is required so
          // the "paginate" pure pipe actually re-evaluates - otherwise it
          // keeps returning its cached page and stale fields like duration()
          // never refresh.
          const updated = [...this.collection.data];
          updated[idx] = res;
          this.collection.data = updated;
        }
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

  public goToPlot(file: PipelineFile): void {
    this.routerService.navigate([`/application/view/instrument/`, file.labSystem.apiKey], { queryParams: { checksum: file.checksum } });
  }

  public goToResults(file: PipelineFile): void {
    this.fileService.getSummary(file.checksum).subscribe(
      res => {
        this.peptideSummaries = res.filter(summary => this.isPeptideSummary(summary));
        this.globalSummaries = res.filter(summary => !this.isPeptideSummary(summary));
        this.peptideColumns = this.computeSummaryColumns(this.peptideSummaries);
        this.ngxSmartModalService.getModal('pipelineDataModal').open()
      },
      err => {
        console.error(err);
      }
    );
  }

  private isPeptideSummary(summary: Summary): boolean {
    return summary.values.some(value =>
      value.param && PipelineStatusComponent.PEPTIDE_PARAM_NAMES.indexOf(value.param.name) !== -1);
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
    const unit = PipelineStatusComponent.PARAM_UNITS[paramName];
    return unit ? `${paramName} (${unit})` : paramName;
  }

  // Instrument-level metrics have a single value each - shown as "label: value" instead
  // of another sparse table.
  public formatGlobalMetric(summary: Summary): string {
    return summary.values.map(value => {
      const unit = value.param ? PipelineStatusComponent.PARAM_UNITS[value.param.name] : undefined;
      return unit ? `${value.calculatedValue} ${unit}` : `${value.calculatedValue}`;
    }).join(', ');
  }

  // Mirrors exactly what the "Results" modal shows - same two sections, same params -
  // so the downloaded files never drift from what's displayed on screen.
  public downloadData(file: PipelineFile): void {
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

  private downloadCSV(csv: string, file: PipelineFile, suffix: string) {
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
