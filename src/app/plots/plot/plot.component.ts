import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from '../../models/chart';
import { DataService } from '../../services/data.service';
import * as Plotly from 'plotly.js';
import { System } from '../../models/system';
import { Subscription } from 'rxjs';
import { ThresholdService } from '../../services/threshold.service';
import { PlotThreshold } from '../../models/plotThreshold';
import * as traceColor from './traceColors';
import { ThresholdParam } from '../../models/thresholdParams';
import { HtmlPlotComponent} from '../helper/html-plot.component';
import { PlotService } from '../../services/plot.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})


export class PlotComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
    private thresholdService: ThresholdService,
    private plotService: PlotService) { }

  @Input() chart: Chart;
  @Input() system: System;
  /**
   * If it is true it means that this plot is in a user view.
   * In that case we need to add to the chart name the
   * labsystem name and the sample type name.
   */
  @Input() shownames: boolean;

  currentDates: string[];
  dateChangesSubscription$: Subscription;

  loading: boolean;
  errorMessage: string;
  error: boolean;

  datesArray;
  dataArray;

  layout: any;

  thresholdColors = ['#a9dbed', '#60c3e8', '#056487'];
  layoutShapes = [];

  plotThreshold: PlotThreshold;

  abbreviatedNames: string[] = [];

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.loadCurrentDates();
    this.subscribeToDateChanges();
    if (this.chart != null) {
      /*
      if (this.chart.isThresholdEnabled) {
        this.loadThreshold();
      } else {
        this.loadData();
      }
      */
     this.loadData();
    }
  }

  ngOnDestroy() {
    this.dateChangesSubscription$.unsubscribe();
  }

  private loadData(): void {
    this.loading = false;
    const datesArray = [];
    const dataArray = [];
    const abbreviatedNames = [];
    this.dataService.getPlotData(this.chart, this.system)
      .subscribe(
        (dataFromServer) => {
          Object.keys(dataFromServer).forEach(function (key) {
            datesArray.push(key);
            Object.keys(dataFromServer[key]).forEach(
              (element) => {
                if (dataArray[element] === undefined) {
                  dataArray[element] = [];
                  if (element !== 'filename') {
                    abbreviatedNames.push(element);
                  }
                }
                dataArray[element].push(dataFromServer[key][element]);
              }
            );
          });
        }, (e) => {
          this.loadErrorPlot(e);
        },
        () => {
          this.datesArray = datesArray;
          this.dataArray = dataArray;
          this.abbreviatedNames = abbreviatedNames;
          if (this.chart.isThresholdEnabled) {
            this.loadThreshold();
          } else {
            this.loadPlot(datesArray, dataArray);
          }
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
            this.loadPlot(this.datesArray, this.dataArray);
          } else {
            this.loadPlot(this.datesArray, this.dataArray);
          }
        } else {
          this.loadPlot(this.datesArray, this.dataArray);
        }
      },
        err => console.log(err));
  }

  private drawThreshold(threshold: PlotThreshold): void {
    // if there is only one context source load only this.
    // this prevents a sigma threshold do be drawed more than once
    let uniqueThresholdParam: ThresholdParam = null;
    if (this.abbreviatedNames.length === 1) {
      uniqueThresholdParam = threshold.thresholdParams.find(tp => tp.contextSource.abbreviated === this.abbreviatedNames[0]);
      for (let i = 0; i < threshold.steps; i++) {
        const shape = {
          type: 'rect',
          x0: 0,
          x1: 1,
          y0: uniqueThresholdParam.initialValue + ((i + 1) * uniqueThresholdParam.stepValue),
          y1: uniqueThresholdParam.initialValue - ((i + 1) * uniqueThresholdParam.stepValue),
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
    } else {
      threshold.thresholdParams.forEach(
        (thresholdParam) => {
          for (let i = 0; i < threshold.steps; i++) {
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
    }
    // this.loadData();
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
      // title: this.chart.name,
      title: this.getChartName(),
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

    const plot = <HtmlPlotComponent>document.getElementById('plot' + this.chart.id);
    plot.on('plotly_click', (data) => {
      this.plotService.sendClick(data, this.system);
    });

  }

  private getChartName(): string {
    if (this.shownames) {
      return this.system.name + ' ' + this.chart.name + ' ' + this.chart.sampleType.name;
    } else {
      return this.chart.name;
    }
  }

  private calculatePointColor(key: string, value: number, traceIndex: number): string {
    // check if threshold exists
    if (this.plotThreshold !== undefined) {
      const thresholdParam: ThresholdParam[] = this.plotThreshold.thresholdParams.filter(th => th.contextSource.abbreviated === key);
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
            if (value > this.layoutShapes[this.layoutShapes.length - 1].y0 || value < this.layoutShapes[this.layoutShapes.length - 1].y1) {
              return 'red';
            } else {
              return traceColor.colorRange[traceIndex];
            }

          default:
            return null;
        }
      } else {
        return traceColor.colorRange[traceIndex];
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
