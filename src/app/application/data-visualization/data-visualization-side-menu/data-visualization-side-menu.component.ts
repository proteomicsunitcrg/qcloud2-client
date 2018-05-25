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
  cosa = 'cosa';

  datePickers: any[] = [];

  ngOnInit() {
    this.loadDatesArray();
    this.enableDatePickers();

  }

  private enableDatePickers(): void {
    const datePickers = document.getElementsByClassName('datepicker');

    for ( let i = 0; i < datePickers.length; i++) {
      const options = {
        format: 'yyyy-mm-dd',
        firstDay: 1,
        defaultDate: new Date(this.datesArray[i]),
        setDefaultDate: true
      };
      const instance = M.Datepicker.init(datePickers[i], options);
      this.datePickers.push(instance);
    }


  }

  private loadDatesArray(): void {
    const today = moment().format('YYYY-MM-DD');
    const monthAgo = moment().subtract(8, 'week').format('YYYY-MM-DD');
    this.datesArray[0] = monthAgo;
    this.datesArray[1] = today;
    this.sendDates(this.datesArray);
  }
  public sendDates(datesArray: string[]): void {
    this.dataService.selectDates(datesArray);
  }

  search(): void {
    const startDate = this.datePickers[0].toString();
    const endDate = this.datePickers[1].toString();
    this.dataService.selectDates([startDate, endDate]);
  }

}
