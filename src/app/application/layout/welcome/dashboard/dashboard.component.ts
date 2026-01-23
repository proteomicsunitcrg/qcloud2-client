import { Component, OnDestroy, OnInit } from '@angular/core';
import { System } from '../../../../models/system';
import { SystemService } from '../../../../services/system.service';
import { FileService } from '../../../../services/file.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../../services/websocket.service';
import { Router } from '@angular/router';
import { File } from '../../../../models/file';
import { Summary } from '../../../../models/summary';

declare var M: any;

interface ResultRow {
  peptideSequence: string;
  parameter: string;
  value: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private fileService: FileService,
    private systemService: SystemService,
    public ngxSmartModalService: NgxSmartModalService,
    private webSocketService: WebsocketService,
    private routerService: Router
  ) { }

  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  filename = '';
  labsystem = '';
  sampleType = '';

  collection = { count: 0, data: [] };
  labSystems: System[] = [];

  dashboardSubscription: Subscription;

  // Used both for Results table and TSV export
  resultRows: ResultRow[] = [];

  /* =========================
     Lifecycle
     ========================= */

  ngOnInit() {
    this.getNodeLs();
    this.getPage();
    this.subscribeToDashboardIntranet();
  }

  ngOnDestroy() {
    if (this.dashboardSubscription) {
      this.dashboardSubscription.unsubscribe();
    }
  }

  /* =========================
     Paging and filters
     ========================= */

  public getPage(): void {
    this.fileService.getAllFilesByNode(
      this.config.currentPage - 1,
      this.config.itemsPerPage,
      this.filename,
      this.labsystem,
      this.sampleType
    ).subscribe(
      res => {
        this.collection.data = res.content;
        this.collection.count = res.totalElements;
        this.config.totalItems = res.totalElements;
      },
      err => console.error(err)
    );
  }

  private getNodeLs(): void {
    this.systemService.getSystems().subscribe(
      res => {
        this.labSystems = res.filter(item => item.active);
        setTimeout(() => M.AutoInit(), 500);
      },
      err => console.error(err)
    );
  }

  public pageChanged(event: number) {
    this.config.currentPage = event;
    this.getPage();
  }

  /* =========================
     Navigation
     ========================= */

  public goToPlot(file: File): void {
    this.routerService.navigate(
      ['/application/view/instrument/', file.labSystem.apiKey],
      { queryParams: { checksum: file.checksum } }
    );
  }

  /* =========================
     RESULTS (visualization)
     ========================= */

  public goToResults(file: File): void {
    this.fileService.getSummary(file.checksum).subscribe(
      res => {
        this.resultRows = this.buildUnifiedRows(res);
        this.ngxSmartModalService.getModal('dataModal').open();
      },
      err => console.error(err)
    );
  }

  /* =========================
     DOWNLOAD (TSV)
     ========================= */

  public downloadData(file: File): void {
    this.fileService.getSummary(file.checksum).subscribe(
      res => {
        const rows = this.buildUnifiedRows(res);
        const tsv = this.mountUnifiedTSVFromRows(rows);
        this.downloadCSV(tsv, file, '_qcloud_metrics.tsv');
      },
      err => console.error(err)
    );
  }

  /* =========================
     CORE LOGIC (single source of truth)
     ========================= */

  private buildUnifiedRows(summary: Summary[]): ResultRow[] {
    const rows: ResultRow[] = [];

    for (const s of summary) {
      const cleanedPeptide = this.cleanPeptideSequence(s.sequence);

      for (const v of s.values) {
        if (!v.param) {
          continue;
        }

        const value =
          v.calculatedValue !== null && v.calculatedValue !== undefined
            ? v.calculatedValue
            : v.value;

        if (value === null || value === undefined) {
          continue;
        }

        const isPeptide = this.isPeptideMetric(v.param.name);

        const peptideSequence = isPeptide
          ? cleanedPeptide
          : 'TOTAL';

        let parameterName: string;

        if (isPeptide) {
          parameterName = v.param.name;
        } else if (v.contextSource && v.contextSource.name) {
          parameterName = v.contextSource.name;
        } else {
          parameterName = v.param.name;
        }

        rows.push({
          peptideSequence: peptideSequence,
          parameter: parameterName,
          value: value
        });
      }
    }

    return rows;
  }

  private mountUnifiedTSVFromRows(rows: ResultRow[]): string {
    const sep = '\t';
    let tsv = `peptide_sequence${sep}parameter${sep}value\n`;

    for (const r of rows) {
      tsv += r.peptideSequence + sep + r.parameter + sep + r.value + '\n';
    }

    return tsv;
  }

  /* =========================
     Helpers
     ========================= */

  private isPeptideMetric(paramName: string): boolean {
    return (
      paramName === 'Peak area' ||
      paramName === 'Mass accuracy' ||
      paramName === 'Retention time'
    );
  }

  private cleanPeptideSequence(seq: string): string {
    if (!seq) {
      return '';
    }

    let clean = seq.replace(/\(Carbamidomethyl\)/g, '');
    clean = clean.replace(/_/g, '');

    return clean;
  }

  private downloadCSV(tsv: string, file: File, suffix: string) {
    const dataStr =
      'data:text/tab-separated-values;charset=utf-8,' +
      encodeURIComponent(tsv);

    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', file.filename + suffix);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  private subscribeToDashboardIntranet(): void {
    this.dashboardSubscription =
      this.webSocketService.updateDashboard$.subscribe(
        () => this.getPage(),
        err => console.error(err)
      );
  }
}
