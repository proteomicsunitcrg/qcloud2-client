import { Component, OnInit } from '@angular/core';
import { AnnotationService } from '../../../services/annotation.service';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import * as moment from 'moment';
declare var M: any;
@Component({
  selector: 'app-annotations-main',
  templateUrl: './annotations-main.component.html',
  styleUrls: ['./annotations-main.component.css']
})
export class AnnotationsMainComponent implements OnInit {

  constructor(private annotationService: AnnotationService, private lsService: SystemService) { }

  ngOnInit() {
    this.getPage();
    this.getUserLs();
  }

  allLs: System[] = [];

  selectedLs = null;

  startDate;

  endDate;

  collection = { count: 0, data: [] };

  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  private getPage(): void {
    this.startDate = document.getElementById("startDate")['value'];
    this.endDate = document.getElementById("endDate")['value'];
    let dateToSendStart = this.startDate;
    let dateToSendEnd = this.endDate;
    if (dateToSendStart === "") {
      dateToSendStart = new Date().toISOString();
    } else {
      dateToSendStart = new Date(dateToSendStart).toISOString();
    }
    if (dateToSendEnd === "") {
      dateToSendEnd = new Date(2010, 0, 0).toISOString();
    } else {
      dateToSendEnd = new Date(dateToSendEnd).toISOString();
    }

    this.annotationService.getPage(this.config.currentPage - 1, 10, this.selectedLs, dateToSendStart,dateToSendEnd).subscribe(
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

  private getUserLs(): void {
    this.lsService.getSystems().subscribe(
      res => {
        this.allLs = res;
        setTimeout(() => {  // The timeout is necessary because the select isnt instant
          M.AutoInit();
        }, 1000);
      },
        err => {
          console.error(err);
        }
    );
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

}
