import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../services/file.service';
import * as moment from 'moment';
import { DataService } from '../../../services/data.service';
declare var M: any;
@Component({
  selector: 'app-data-visualization-side-menu',
  templateUrl: './data-visualization-side-menu.component.html',
  styleUrls: ['./data-visualization-side-menu.component.css']
})
export class DataVisualizationSideMenuComponent implements OnInit {

  constructor(private fileService: FileService,
    private dataService: DataService) { }

  datesArray: string[] = [];
  cosa: string = 'cosa';

  datePickers: any[]=[];

  ngOnInit() {
    this.loadDatesArray();
    this.enableDatePickers();

  }

  private enableDatePickers(): void {
    let datePickers = document.getElementsByClassName('datepicker');

    for (var i = 0; i < datePickers.length; i++) {
      let options = {
        format: 'yyyy-mm-dd',
        firstDay: 1,
        defaultDate: new Date(this.datesArray[i]),
        setDefaultDate: true
      }
      let instance = M.Datepicker.init(datePickers[i], options);
      this.datePickers.push(instance);
    }


  }

  private loadDatesArray(): void {
    var today = moment().format('YYYY-MM-DD');
    var monthAgo = moment().subtract(6, 'week').format('YYYY-MM-DD');
    this.datesArray[0] = monthAgo;
    this.datesArray[1] = today;
    this.sendDates(this.datesArray);
  }
  public sendDates(datesArray: string[]): void {
    this.dataService.selectDates(datesArray);
  }

  search(): void {
    let startDate = this.datePickers[0].toString();
    let endDate = this.datePickers[1].toString();
    
    this.dataService.selectDates([startDate,endDate]);
  }

}
