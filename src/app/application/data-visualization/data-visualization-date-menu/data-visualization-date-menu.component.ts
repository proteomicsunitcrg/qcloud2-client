import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../../../services/data.service';
import { WebsocketService } from '../../../services/websocket.service';
import { AnnotationService } from '../../../services/annotation.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../../../models/data';
import { Annotation } from '../../../models/annotation';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core'

declare var M: any;
@Component({
  selector: 'app-data-visualization-date-menu',
  templateUrl: './data-visualization-date-menu.component.html',
  styleUrls: ['./data-visualization-date-menu.component.css']
})
export class DataVisualizationDateMenuComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
    private websocketService: WebsocketService,
    private annotationService: AnnotationService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef) { }

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

  instrumentApiKey: string;

  csvAnnos: { filename: String, annotation: Annotation }[] = [];

  showDownloadCSV = true;

  selectedQCSubscription: Subscription;

  userView = false;



  ngOnInit() {
    this.selectedDateRange = this.dateRanges[1];
    this.loadDatesArray();
    this.enableDatePickers();
    this.subscribeToRoute();
    this.subscribeToSelectedQC();
  }

  ngOnDestroy(): void {
    this.selectedQCSubscription.unsubscribe();
  }

  private subscribeToSelectedQC(): void {
    this.selectedQCSubscription = this.dataService.selectedQC$.subscribe(
      res => {
        if (res != 'QC01') {
          this.showDownloadCSV = false;
          this.cdRef.detectChanges();
        } else {
          this.route.params.subscribe(
            (params) => {
              if (params['type'] == 'user') {
                this.userView = true;
                this.showDownloadCSV = false;
              } else {
                this.userView = false;
                this.showDownloadCSV = true;
              }
            }
          );
          this.cdRef.detectChanges();

        }
      }
    )
  }

  private subscribeToRoute(): void {
    this.route.params.subscribe(
      (params) => {
        this.instrumentApiKey = params['apiKey'];
        if (params['type'] == 'user') {
          this.userView = true;
        }
      }
    );
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
    const diff = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24);
    this.dataService.selectDates([startDate, endDate]);
    if (diff >= 90) {
      this.hideAnnotations = true;
      this.showDownloadCSV = false;
      this.emitAnnotations();
    }

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

  public csv(): void {
    const startDate = new Date(this.datePickers[0].date);
    const endDate = new Date(this.datePickers[1].date);
    const diff = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24);
    if (diff >= 90) {
      alert("If you want to download a longer time window, please use the QCloud API");
      return;
    }
    this.dataService.getDataForCSV(this.instrumentApiKey, startDate, endDate).subscribe(
      res => {
        this.downloadCSV(this.mountCSV(res));
      },
      err => {
        console.error(err);
      }
    );
  }

  private mountCSV(res): string {
    const csList = ["LVNELTEFAK", "HLVDEPQNLIK", "VPQVSTPTLVEVSR", "EAC(Carbamidomethyl)FAVEGPK", "EYEATLEEC(Carbamidomethyl)C(Carbamidomethyl)AK", "EC(Carbamidomethyl)C(Carbamidomethyl)HGDLLEC(Carbamidomethyl)ADDR",
      "SLHTLFGDELC(Carbamidomethyl)K", "TC(Carbamidomethyl)VADESHAGC(Carbamidomethyl)EK", "YIC(Carbamidomethyl)DNQDTISSK", "NEC(Carbamidomethyl)FLSHK"];
    let csvString = '';
    const separator = '\t';
    const headers = `Creation_date${separator}Filename${separator}Op_annotation${separator}Peptide_sequence${separator}MZ${separator}RT_drift_min${separator}Peptide_area${separator}Mass_accuracy_ppm\n`;
    for (let file of res) {
      if (file.data.length === 0) { //skip files with errors
        continue;
      }
      const filename = file.data[0].file.filename;
      const adquisition_date = file.data[0].file.creationDate;
      let annotation = '';
      if (file.annotation !== null) {
        file.annotation.troubleshootings.forEach(element => {
          annotation += `${element.name}, `;
        });
        annotation += file.annotation.description;
      } else {
        annotation = 'none';
      }
      for (const cs of csList) {
        // console.log(file, filename);
        const csData = this.getBySeq(file.data, cs);
        // console.log(csData);
        const peakArea = this.getByParam(csData, "Peak area");
        if (peakArea == undefined) {
          continue;
        }
        const mz = peakArea.contextSource.mz;
        const massAcc = this.getByParam(csData, 'Mass accuracy');
        const rt = this.getByParam(csData, 'Retention time');
        csvString += `${adquisition_date}${separator}${filename}${separator}${annotation}${separator}${cs}${separator}${mz}${separator}${rt.calculatedValue}${separator}${peakArea.calculatedValue}${separator}${massAcc.calculatedValue}\n`
      }
    }
    return headers + csvString;
  }

  private downloadCSV(csv: string) {
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${this.instrumentApiKey}-${this.dataService.getCurrentDates()}.tsv`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }



  private getBySeq(file: Data[], target: string): Data[] {
    let list = [];
    for (let data of file) {
      if (data.contextSource.name === target) {
        list.push(data);
      }
    }
    return list;
  }

  private getByParam(data: Data[], target: string): Data {
    for (let dat of data) {
      if (dat.param.name == target) {
        return dat;
      }
    }
  }

}
