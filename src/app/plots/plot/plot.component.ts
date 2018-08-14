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
import { HtmlPlotComponent } from '../helper/html-plot.component';
import { PlotService } from '../../services/plot.service';
import { calculateMean, generateLayoutShapes, loadDataAndDatesArray } from '../helper/plotUtilities';

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

  // datesArray;
  // dataArray;
  // abbreviatedNames: string[] = [];

  layout: any;

  serverData: {dates: any[], data: any[], names: any[]};

  layoutShapes = [];

  plotThreshold: PlotThreshold;


  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.loadCurrentDates();
    this.subscribeToDateChanges();
    if (this.chart != null) {
      this.loadData();
    }
  }

  ngOnDestroy() {
    this.dateChangesSubscription$.unsubscribe();
  }

  private loadData(): void {
    this.loading = false;
    this.dataService.getPlotData(this.chart, this.system)
      .subscribe(
        (dataFromServer) => {
          this.serverData = loadDataAndDatesArray(dataFromServer);
          /*
          this.dataArray = serverData.data;
          this.datesArray = serverData.dates;
          this.abbreviatedNames = serverData.names;
          */
          if (this.chart.isThresholdEnabled) {
            this.loadThreshold();
          } else {
            this.loadPlot();
          }
        }, (e) => {
          this.loadErrorPlot(e);
        }
      );
  }

  private loadThreshold(): void {
    this.thresholdService.getPlotThreshold(this.chart, this.system)
      .subscribe((threshold) => {
        if (threshold != null) {
          if (threshold.monitored) {
            console.log('th', threshold);
            this.plotThreshold = threshold;
            this.drawThreshold();
            this.loadPlot();
          } else {
            this.loadPlot();
          }
        } else {
          this.loadPlot();
        }
      }, err => console.log(err));
  }

  private drawThreshold(): void {
    // if there is only one context source load only this.
    // this prevents a sigma threshold do be drawed more than once
    let uniqueThresholdParam: ThresholdParam = null;

    if (this.serverData.names.length === 1) {
      uniqueThresholdParam = this.plotThreshold.thresholdParams.find(tp => tp.contextSource.abbreviated === this.serverData.names[0]);
      if (uniqueThresholdParam !== undefined && uniqueThresholdParam.isEnabled) {
        generateLayoutShapes(uniqueThresholdParam, this.plotThreshold.steps).forEach(
          (layoutShape) => {
            this.layoutShapes.push(layoutShape);
          });
      }
    } else {
      this.plotThreshold.thresholdParams.forEach(
        (thresholdParam) => {
          if (thresholdParam.isEnabled) {
            generateLayoutShapes(thresholdParam, this.plotThreshold.steps).forEach(
              (layoutShape) => {
                this.layoutShapes.push(layoutShape);
              });
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

  private loadPlot(): void {
    const minValues = [];
    const maxValues = [];

    const dataForPlot = [];
    let traceIndex = 0;
    for (const key in this.serverData.data) {
      if (key === 'filename') {
        continue;
      }
      const values = [];

      const colorsForLine = [];
      const markersForLine = [];

      const mean = calculateMean(this.serverData.data[key]);

      const textArray = [];

      this.serverData.data[key].forEach(
        (element, index) => {
          let marker = 'circle';
          let color = this.calculatePointColor(key, element, traceIndex);
          let elementText = element;
          if (isNaN(element)) {
            element = mean;
            marker = 'diamond';
            color = '#edbfa9';
            elementText = 'No data';
          }
          values.push(element);
          colorsForLine[index] = color;
          markersForLine[index] = marker;
          textArray[index] = elementText + '<br>' + this.serverData.data['filename'][index];
        }
      );

      minValues.push(Math.min.apply(null, values.filter((n) => !isNaN(n))));
      maxValues.push(Math.max.apply(null, values.filter((n) => !isNaN(n))));

      const trace = {
        x: this.serverData.dates,
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          color: colorsForLine,
          symbol: markersForLine,
          size: 5
        },
        line: {
          // color: colorsForLine,
        },
        connectgaps: false,
        name: key,
        description: 'number of ' + key,
        filenames: this.serverData.data['filename'],
        hoverinfo: 'x+text',
        hovertext: textArray
      };
      dataForPlot.push(trace);
      traceIndex++;
    }

    let MINVALUEFORPLOT;
    let MAXVALUEFORPLOT;

    if (this.plotThreshold === undefined || this.layoutShapes.length === 0) {
      MINVALUEFORPLOT = Math.min.apply(null, minValues) - Math.abs((Math.min.apply(null, minValues) * 0.1));
      MAXVALUEFORPLOT = Math.max.apply(null, maxValues) + (Math.max.apply(null, maxValues) * 0.1);
    } else {
      const height = (this.layoutShapes[this.layoutShapes.length - 1]['y0'] - this.layoutShapes[this.layoutShapes.length - 1]['y1']) * 0.3;
      MINVALUEFORPLOT = this.layoutShapes[this.layoutShapes.length - 1]['y1'] - height;
      MAXVALUEFORPLOT = this.layoutShapes[this.layoutShapes.length - 1]['y0'] + height;
    }

    this.layout = {
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
      const thresholdParam: ThresholdParam = this.plotThreshold.thresholdParams.find(th => th.contextSource.abbreviated === key);
      if (thresholdParam !== undefined && thresholdParam.isEnabled) {
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
