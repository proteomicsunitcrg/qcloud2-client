import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from '../../models/chart';
import { DataSource } from '../../models/dataSource';
import { DataService } from '../../services/data.service';
import * as Plotly from 'plotly.js';
import * as moment from 'moment';
import { System } from '../../models/system';
import { Subscription } from 'rxjs/Subscription';
import { ThresholdService } from '../../services/threshold.service';
import { PlotThreshold } from '../../models/plotThreshold';
import * as traceColor from './traceColors';
import { ThresholdParam } from '../../models/thresholdParams';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
    private thresholdService: ThresholdService) { }

  @Input() chart: Chart;
  @Input() system: System;

  currentDates: string[];
  dateChangesSubscription$: Subscription;

  loading: boolean;
  errorMessage: string;
  error: boolean;

  layout: any;

  thresholdColors = ['#a9dbed', '#60c3e8', '#056487'];
  layoutShapes = [];

  plotThreshold: PlotThreshold;

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.loadCurrentDates();
    this.subscribeToDateChanges();
    if (this.chart != null) {
      if (this.chart.isThresholdEnabled) {
        this.loadThreshold();
      } else {
        this.loadData();
      }
    }
  }

  ngOnDestroy() {
    this.dateChangesSubscription$.unsubscribe();
  }

  private loadData(): void {
    this.loading = false;
    const datesArray = [];
    const dataArray = [];
    this.dataService.getPlotData(this.chart, this.system)
      .subscribe(
        (dataFromServer) => {
          Object.keys(dataFromServer).forEach(function (key) {
            datesArray.push(key);
            Object.keys(dataFromServer[key]).forEach(
              (element) => {
                if (dataArray[element] === undefined) {
                  dataArray[element] = [];
                }
                dataArray[element].push(dataFromServer[key][element]);
              }
            );
          });
        }, (e) => {
          this.loadErrorPlot(e);
        },
        () => {
          this.loadPlot(datesArray, dataArray);
        }
      );
  }

  private loadThreshold(): void {
    this.thresholdService.getPlotThreshold(this.chart, this.system)
      .subscribe((threshold) => {
        if (threshold != null) {
          if (threshold.monitored) {
            this.drawThreshold(threshold);
            this.plotThreshold = threshold;
          } else {
            this.loadData();
          }
        } else {
          this.loadData();
        }
      },
        err => console.log(err));
  }

  private drawThreshold(threshold: PlotThreshold): void {
    threshold.thresholdParams.forEach(
      (thresholdParam) => {
        for (let i = 0; i < threshold.steps; i++) {
          const value = thresholdParam.initialValue + ((i + 1) * thresholdParam.stepValue);
          const shape = {
            type: 'rect',
            x0: 0,
            x1: 1,
            y0: thresholdParam.initialValue + ((i + 1) * thresholdParam.stepValue),
            y1: thresholdParam.initialValue - ((i + 1) * thresholdParam.stepValue),
            xref: 'paper',
            fillcolor: this.thresholdColors[i],
            opacity: 0.5,
            line: {
              color: 'red',
              width: 0
            },
            layer: 'below'
          };
          this.layoutShapes.push(shape);
        }
      }
    );
    this.loadData();
  }

  private loadErrorPlot(error: any): void {
    this.loading = false;
    this.error = true;
    this.errorMessage = error.error.message;

  }

  private loadPlot(datesArray, dataArray): void {
    const minValues = [];
    const maxValues = [];

    const dataForPlot = [];
    let traceIndex = 0;
    for (const key in dataArray) {
      if (key === 'filename') {
        continue;
      }
      const values = [];

      const colorsForLine = [];

      dataArray[key].forEach(
        (element, index) => {
          values.push(element);
          colorsForLine[index] = this.calculatePointColor(key, element, traceIndex);
        }
      );
      minValues.push(Math.min.apply(null, values.filter((n) => !isNaN(n))));
      maxValues.push(Math.max.apply(null, values.filter((n) => !isNaN(n))));

      const trace = {
        x: datesArray,
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          color: colorsForLine,
          size: 5
        },
        line: {
          // color: colorsForLine,
        },
        connectgaps: false,
        name: key,
        description: 'number of ' + key,
        filenames: dataArray['filename'],
        hoverinfo: 'y+x+text',
        hovertext: dataArray['filename']
      };
      dataForPlot.push(trace);
      traceIndex++;
    }

    const MINVALUEFORPLOT = Math.min.apply(null, minValues) - Math.abs((Math.min.apply(null, minValues) * 0.1));
    const MAXVALUEFORPLOT = Math.max.apply(null, maxValues) + (Math.max.apply(null, maxValues) * 0.1);

    this.layout = {
      title: this.chart.name,
      shapes: [],
      colorway: traceColor.colorRange,
      hovermode: 'closest',
      xaxis: {
        nticks: 10,
      },
      yaxis: {
        type: 'linear',
        range: [MINVALUEFORPLOT, MAXVALUEFORPLOT]
      },
      sampleType: this.chart.sampleType.name,
      currentDiv: 'plot'
    };
    this.layout.shapes = this.layoutShapes;
    Plotly.react('plot' + this.chart.id, dataForPlot, this.layout);
  }

  private calculatePointColor(key: string, value: number, traceIndex: number): string {
    // check if threshold exists
    if (this.plotThreshold !== undefined) {
      const thresholdParam: ThresholdParam[] = this.plotThreshold.thresholdParams.filter(th => th.contextSource.name === key);
      if (thresholdParam.length > 0) {
        switch (this.plotThreshold.nonConformityDirection) {
          case 'DOWN':
            // taking care if the steps is 1
            if (this.layoutShapes.length > 1) {
              if (value < this.layoutShapes[this.layoutShapes.length - 1].y1) {
                return 'red';
              } else if (value > this.layoutShapes[this.layoutShapes.length - 1].y1
                && value < this.layoutShapes[this.layoutShapes.length - 2].y1) {
                return 'yellow';
              } else {
                return traceColor.colorRange[traceIndex];
              }
            } else {
              if (value < this.layoutShapes[this.layoutShapes.length - 1].y1) {
                return 'red';
              } else {
                return traceColor.colorRange[traceIndex];
              }
            }
          case 'UPDOWN':
            if (value > this.layoutShapes[this.layoutShapes.length - 1].y0 || value < this.layoutShapes[this.layoutShapes.length - 1].y1 ) {
              return 'red';
            } else {
              return traceColor.colorRange[traceIndex];
            }

          default:
            return null;
        }
      }
    } else {
      return traceColor.colorRange[traceIndex];
    }
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
          // this.loadThreshold();
        }
      );
  }

}
