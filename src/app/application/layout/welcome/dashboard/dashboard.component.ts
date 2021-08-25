import { Component, OnDestroy, OnInit } from '@angular/core';
import { System } from '../../../../models/system';
import { SystemService } from '../../../../services/system.service';
import { FileService } from '../../../../services/file.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FileIntranetService } from '../../../../services/file-intranet.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../../services/websocket.service';
import { Router } from '@angular/router';
import { File } from '../../../../models/file';
import { ContextSourceService } from '../../../../services/context-source.service';
import { SampleCompositionService } from '../../../../services/sample-composition.service';
import { Summary } from '../../../../models/summary';

declare var M: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private fileService: FileService, private systemService: SystemService, public ngxSmartModalService: NgxSmartModalService,
    private fileIntranetService: FileIntranetService, private webSocketService: WebsocketService, private routerService: Router, private contextSourceService: ContextSourceService,
    private sampleCompositionService: SampleCompositionService
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

  fileData = [];

  dashboardSubscription: Subscription;

  summaries: Summary[] = [];

  ngOnInit() {
    this.getNodeLs();
    this.getPage();
    this.subscribeToDashboardIntranet();
  }

  ngOnDestroy() {
    this.dashboardSubscription.unsubscribe();
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
        this.summaries = res;
        this.ngxSmartModalService.getModal('dataModal').open()
      },
      err => {
        console.error(err);
      }
    );
  }

  public downloadData(file: File): void {
    this.fileService.getSummary(file.checksum).subscribe(
      res => {
        this.downloadCSV(this.mountCSV(res), file);
      },
      err => {
        console.error(err);
      }
    );
  }

  private mountCSV(summary: Summary[]): string {
    const separator = ',';
    const headers = `sequence${separator}peak_area(au)${separator}mass_accuracy(ppm)${separator}retention_time(min)\n`;
    let csvText = '';
    for (const peptide of summary) {
      csvText += `${peptide.sequence}${separator}${this.getDataFromParam(peptide.values, 'Peak area')['calculatedValue']}${separator}${this.getDataFromParam(peptide.values, 'Mass accuracy')['calculatedValue']}${separator}${this.getDataFromParam(peptide.values, 'Retention time')['calculatedValue']}\n`;
    }
    return headers + csvText;
  }

  private downloadCSV(csv: string, file: File) {
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${file.filename}.csv`);
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
