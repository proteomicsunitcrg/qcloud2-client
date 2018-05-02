import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from '../../models/chart';
import { DataSource } from '../../models/dataSource';
import { DataService } from '../../services/data.service';
import * as Plotly from 'plotly.js';
import * as moment from 'moment';
import { System } from '../../models/system';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit,OnDestroy {

  constructor(private dataService: DataService) { }

  @Input() chart: Chart;
  //@Input() dataSource: DataSource;
  @Input() system: System;

  currentDates: string[];
  dateChangesSubscription$: Subscription;

  loading: boolean;
  errorMessage: string;
  error: boolean;

  ngOnInit() {    
    this.loading = true;
    this.error = false;
    this.loadCurrentDates();
    this.subscribeToDateChanges();
    if(this.chart!=null) {
      this.loadData();
    }
  }

  ngOnDestroy() {
    this.dateChangesSubscription$.unsubscribe();
  }

  private loadData(): void {
    this.loading=false;
    let datesArray = [];
    let dataArray = [];
    this.dataService.getPlotData(this.chart,this.system)
      .subscribe(
        (dataFromServer) => {
          Object.keys(dataFromServer).forEach(function (key) {
            datesArray.push(key);            
            Object.keys(dataFromServer[key]).forEach(
              (element) => {
                if (dataArray[element] == undefined) {
                  dataArray[element] = [];
                }
                dataArray[element].push(dataFromServer[key][element]);
              }
            )
          });
        }, (e) => {
          this.loadErrorPlot(e);
        },
        () => this.loadPlot(datesArray, dataArray)
      )
  }

  private loadErrorPlot(error: any): void {
    this.loading=false;
    this.error = true;
    this.errorMessage = error.error.message;
    
  }

  private loadPlot(datesArray, dataArray): void {    
    let dataForPlot = [];
    for (let key in dataArray) {      
      if(key ==='filename') {
        continue;
      }
      let values = [];
      
      dataArray[key].forEach(
        (element, index) => {
          // values.push(Math.log2(element));
          values.push(element);
        }
      );

      var trace = {
        x: datesArray,
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        connectgaps: false,
        name: key,
        description: 'number of ' + key,
        filenames: dataArray['filename'],
        hoverinfo: 'y+x+text',
        hovertext: dataArray['filename']
      }
      dataForPlot.push(trace);
    }
    var layout = {
      title: this.chart.name,
      shapes: [],
      hovermode: 'closest',
      xaxis: {
        nticks: 10,
      },
      sampleType: this.chart.sampleType.name,
      currentDiv: 'plot'
    };
    //Plotly.newPlot('plot'+this.chart.id, dataForPlot, layout);
    Plotly.react('plot'+this.chart.id, dataForPlot, layout);
  }


  private loadCurrentDates(): void {
    this.currentDates = this.dataService.getCurrentDates();
  }

  private subscribeToDateChanges(): void {
    this.dateChangesSubscription$ = this.dataService.selectedDates$
      .subscribe(
        (dates) => {
          this.currentDates = dates;
          // reload the plot...
          this.loadData();
        }
      )
  }

}
