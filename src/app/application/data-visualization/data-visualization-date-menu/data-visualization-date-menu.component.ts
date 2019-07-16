import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../../../services/data.service';
import { WebsocketService } from '../../../services/websocket.service';
import { AnnotationService } from '../../../services/annotation.service';
import { ActivatedRoute } from '@angular/router';
declare var M: any;
@Component({
  selector: 'app-data-visualization-date-menu',
  templateUrl: './data-visualization-date-menu.component.html',
  styleUrls: ['./data-visualization-date-menu.component.css']
})
export class DataVisualizationDateMenuComponent implements OnInit {

  constructor(private dataService: DataService,
    private websocketService: WebsocketService,
    private annotationService: AnnotationService,
    private route: ActivatedRoute) { }

  datesArray: string[] = [];

  dateRanges: { 'days': number, 'name': string }[] = [
    {
      'days': 5,
      'name': '5 days'
    },
    {
      'days': 15,
      'name': '15 days'
    },
    {
      'days': 30,
      'name': 'Month'
    }
  ];

  selectedDateRange: { 'days': number, 'name': string };

  datePickers: any[] = [];

  hideAnnotations = false;

  ngOnInit() {
    this.selectedDateRange = this.dateRanges[0];
    this.loadDatesArray();
    this.enableDatePickers();
  }

  private enableDatePickers(): void {
    const datePickers = document.getElementsByClassName('datepicker');

    for (let i = 0; i < datePickers.length; i++) {
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
    const monthAgo = moment().subtract(this.selectedDateRange.days, 'days').format('YYYY-MM-DD');
    this.datesArray[0] = monthAgo;
    this.datesArray[1] = today;
    this.sendDates(this.datesArray);
  }

  public sendDates(datesArray: string[]): void {
    this.dataService.selectDates(datesArray);
    this.loadAnnotations(datesArray);
  }

  search(): void {
    this.selectedDateRange = null;
    this.websocketService.dateRangeAllowNewData = false;
    const startDate = this.datePickers[0].toString();
    const endDate = this.datePickers[1].toString();
    this.dataService.selectDates([startDate, endDate]);
    this.loadAnnotations([startDate, endDate]);
  }

  doChangeRange(): void {
    this.websocketService.dateRangeAllowNewData = true;
    this.loadDatesArray();
    const startDateinstance = this.datePickers[0];
    const startDate = new Date(this.datesArray[0] + 'T00:00:00+02:00');
    startDateinstance.setDate(startDate);

    const endDateInstance = this.datePickers[1];
    const endDate = new Date(this.datesArray[1] + 'T00:00:00+02:00');
    endDateInstance.setDate(endDate);
  }

  private loadAnnotations(datesArray: string[]): void {
    this.route.params.subscribe(
      (params) => {
        if (params.type === 'instrument') {
          this.annotationService.getAnnotationsBetweenDates(datesArray, params.apiKey);
        }
      });
  }

  public emitAnnotations(): void {
    this.dataService.changeHideAnnotations(this.hideAnnotations);
  }

}
