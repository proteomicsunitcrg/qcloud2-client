import { Component, OnDestroy, OnInit } from '@angular/core';
import { System } from '../../../models/system';
import { SystemService } from '../../../services/system.service';
import { FileService } from '../../../services/file.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FileIntranetService } from '../../../services/file-intranet.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { WebsocketService } from '../../../services/websocket.service';
import { ContextSourceService } from '../../../services/context-source.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';
import { PipelineFile } from '../../../models/pipeline-file';

declare var M: any;
@Component({
  selector: 'app-pipeline-status',
  templateUrl: './pipeline-status.component.html',
  styleUrls: ['./pipeline-status.component.css']
})
export class PipelineStatusComponent implements OnInit, OnDestroy {

  constructor(private fileService: FileService, private systemService: SystemService, public ngxSmartModalService: NgxSmartModalService,
    private fileIntranetService: FileIntranetService, private webSocketService: WebsocketService, private contextSourceService: ContextSourceService,
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
    const isDone = file.status === 'PROCESSED' || file.status === 'ERROR';
    // processingStartedDate is only set by a fire-and-forget call from the
    // pipeline (qcloud.nf/qcloud_diann.nf) that can silently fail - once the
    // file is at least PROCESSING, fall back to received->now/done instead
    // of pure compute time, so there's always a real number on screen.
    const start = file.processingStartedDate || (file.status === 'PROCESSING' || isDone ? file.receivedDate : null);
    if (!start) {
      return file.receivedDate ? 'queued' : '';
    }
    const seconds = PipelineStatusComponent.elapsedSeconds(start, isDone ? file.updatedDate : new Date());
    const formatted = PipelineStatusComponent.formatDuration(seconds);
    return isDone ? formatted : `${formatted} (ongoing)`;
  }

  private static elapsedSeconds(start: string | Date, end: string | Date): number {
    return Math.max(0, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 1000));
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

}
