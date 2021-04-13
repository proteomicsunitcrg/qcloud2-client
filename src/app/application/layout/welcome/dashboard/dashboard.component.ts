import { Component, OnInit } from '@angular/core';
import { System } from '../../../../models/system';
import { SystemService } from '../../../../services/system.service';
import { FileService } from '../../../../services/file.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FileIntranetService } from '../../../../services/file-intranet.service';

declare var M: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fileService: FileService, private systemService: SystemService, public ngxSmartModalService: NgxSmartModalService,
    private fileIntranetService: FileIntranetService
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



  ngOnInit() {
    this.getNodeLs();
    this.getPage();
  }

  public getPage(): void {
    this.fileService.getAllFilesByNode(this.config.currentPage - 1, this.config.itemsPerPage, this.filename, this.labsystem, this.sampleType).subscribe(
      res => {
        this.collection.data = res.content;
        this.collection.count = res.totalElements;
        this.config.totalItems = res.totalElements;
        for (const file of this.collection.data) {
          this.fileService.getFileStatusByChecksum(file.checksum).subscribe(
            res => {
              file.isOk = res;
            },
            err => {
              console.error(err);
            }
          );
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


}
