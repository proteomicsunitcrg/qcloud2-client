import { Component, OnInit, Input } from '@angular/core';
import { Chart } from '../../models/chart';
import { DataSource } from '../../models/dataSource';
import { DataService } from '../../services/data.service';
import * as Plotly from 'plotly.js';
import * as moment from 'moment';
import { System } from '../../models/system';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  constructor(private dataService: DataService) { }

  @Input() chart: Chart;
  //@Input() dataSource: DataSource;
  @Input() system: System;

  currentDates: string[];

  ngOnInit() {    
    this.loadCurrentDates();
    this.subscribeToDateChanges();
    if(this.chart!=null) {
      this.loadData();
    }
  }

  private loadData(): void {
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
        }, (e) => console.log(e),
        () => this.loadPlot(datesArray, dataArray)
      )
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
    Plotly.newPlot('plot'+this.chart.id, dataForPlot, layout);
  }


  private loadCurrentDates(): void {
    this.currentDates = this.dataService.getCurrentDates();
  }

  private subscribeToDateChanges(): void {
    this.dataService.selectedDates$
      .subscribe(
        (dates) => {
          this.currentDates = dates;
          // reload the plot...
          this.loadData();
        }
      )
  }

}
