import { Component, OnInit } from '@angular/core';
import { System } from '../../../../models/system';
import { SystemService } from '../../../../services/system.service';
import { FileService } from '../../../../services/file.service';
declare var M: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fileService: FileService, private systemService: SystemService) { }

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


  ngOnInit() {
    this.getNodeLs();
    this.getPage();
  }

  public getPage(): void {
    console.log(this.labsystem);
    this.fileService.getAllFilesByNode(this.config.currentPage - 1, this.config.itemsPerPage, this.filename, this.labsystem, this.sampleType).subscribe(
      res => {
        console.log(res);
        this.collection.data = res.content;
        this.collection.count = res.totalElements;
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
        console.log(this.labSystems);
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

}
