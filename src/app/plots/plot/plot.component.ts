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
import { generateLayoutShapes, loadDataAndDatesArray } from '../helper/plotUtilities';
import { WebsocketService } from '../../services/websocket.service';
import { PointColor } from './pointColor';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})


export class PlotComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
    private thresholdService: ThresholdService,
    private plotService: PlotService,
    private webSocketService: WebsocketService) { }

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
  webSocketData$: Subscription;
  thresholdFromWebSocket$: Subscription;

  errorMessage: string;
  error: boolean;
  loaded = false;
  noData = true;

  layout: any;

  serverData: { dates: any[], data: any[], names: any[] };

  layoutShapes = [];

  traceColorsByKey = [];

  plotThreshold: PlotThreshold;

  ngOnInit() {
    this.error = false;
    this.loadCurrentDates();
    this.subscribeToDateChanges();
    if (this.chart != null) {
      this.loadData();
    }
    this.subscribeToWebSocketData();
    this.subscribeToWebSocketThreshold();
  }

  ngOnDestroy() {
    this.dateChangesSubscription$.unsubscribe();
    this.webSocketData$.unsubscribe();
    this.thresholdFromWebSocket$.unsubscribe();
  }

  private loadData(): void {
    this.dataService.getPlotData(this.chart, this.system)
      .subscribe(
        (dataFromServer) => {
          this.serverData = loadDataAndDatesArray(dataFromServer);
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

  private subscribeToWebSocketThreshold(): void {
    this.thresholdFromWebSocket$ = this.webSocketService.thresholdFormWebSocket$
      .subscribe((res) => {
        if (res.action === this.chart.param.qCCV &&
          res.apiKey === this.system.apiKey &&
          res.qccv === this.chart.sampleType.qualityControlControlledVocabulary &&
          this.chart.isThresholdEnabled) {

          if (this.noData) {
            this.plotThreshold = res.body;
            this.drawThreshold();
            // relayout the plot
            Plotly.relayout('plot' + this.chart.id, {
              shapes: this.layoutShapes
            });
          }
        }
      });
  }

  private subscribeToWebSocketData(): void {
    this.webSocketData$ = this.webSocketService.dataFromWebSocket$
      .subscribe(
        (res) => {
          if (res.action === this.chart.param.qCCV &&
            res.apiKey === this.system.apiKey &&
            res.qccv === this.chart.sampleType.qualityControlControlledVocabulary) {
            if (this.noData) {
              const newData = loadDataAndDatesArray(this.dataService.mapPlotData(res.body));
              const yValues = [];
              const xValues = [];
              const textValues = [];
              const colorValues = [];
              Object.entries(this.serverData['data']).forEach(
                ([key, value], index) => {
                  if (newData['data'][key] !== undefined) {
                    if (key !== 'filename') {
                      yValues.push([newData['data'][key][0].value]);
                      xValues.push(newData['dates']);
                      textValues.push(newData['data']['filename']);
                      colorValues.push([this.getPointColorFromWebSocket(index, key, newData['data'][key][0].value)]);
                    }
                  }
                }
              );
              Plotly.extendTraces('plot' + this.chart.id, {
                'marker.color': colorValues,
                y: yValues,
                x: xValues,
                hovertext: textValues
              }, Array.apply(null, { length: yValues.length }).map(Number.call, Number));
            }

          }
        }
      );
  }

  private getPointColorFromWebSocket(traceIndex: number, key: string, value: number): string {
    return this.getPointColorForWebSocketPoint(key, this.calculatePointColor(key, value));
  }

  private getPointColorForWebSocketPoint(key: string, status: PointColor): string {
    switch (status) {
      case PointColor.OK:
        return this.traceColorsByKey[key];
      case PointColor.WARNING:
        return 'yellow';
      case PointColor.DANGER:
        return 'red';
      default:
        return this.traceColorsByKey[key];
    }
  }

  private getPointColorFromPointColors(traceIndex: number, status: PointColor): string {
    switch (status) {
      case PointColor.OK:
        return traceColor.colorRange[traceIndex];
      case PointColor.WARNING:
        return 'yellow';
      case PointColor.DANGER:
        return 'red';
      default:
        return traceColor.colorRange[traceIndex];
    }
  }

  private loadThreshold(): void {
    this.layoutShapes = [];
    this.thresholdService.getPlotThreshold(this.chart, this.system)
      .subscribe((threshold) => {
        if (threshold != null) {
          if (threshold.monitored) {
            this.plotThreshold = threshold;
            this.drawThreshold();
            this.loadPlot();
          } else {
            this.loadPlot();
          }
        } else {
          this.loadPlot();
        }
      }, (err) => {
        console.log('loading threshold', err);
        this.loadPlot();
      }
      );
  }

  private drawThreshold(): void {
    this.layoutShapes = [];
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
  }

  private loadErrorPlot(error: any): void {
    this.error = true;
    this.noData = true;
    this.loaded = true;

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

      const textArray = [];

      this.serverData.data[key].forEach(
        (element, index) => {
          const marker = 'circle';
          const pColor = this.calculatePointColor(key, element['value']);
          const color = this.getPointColorFromPointColors(traceIndex, pColor);
          this.traceColorsByKey[key] = color;
          const elementText = element['value'];
          const value = element['value'];
          values.push(value);
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
          color: colorsForLine,
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
    if (dataForPlot.length > 0) {
      this.layout.shapes = this.layoutShapes;

    }
    this.loaded = true;
    this.noData = true;
    if (this.serverData.dates.length > 0) {
      Plotly.react('plot' + this.chart.id, dataForPlot, this.layout);
      const plot = <HtmlPlotComponent>document.getElementById('plot' + this.chart.id);
      plot.on('plotly_click', (data) => {
        this.plotService.sendClick(data, this.system);
      });
    } else {
      Plotly.purge('plot' + this.chart.id);
      this.noData = false;
    }
  }


  private getChartName(): string {
    if (this.shownames) {
      return this.system.name + ' ' + this.chart.name + ' ' + this.chart.sampleType.name;
    } else {
      return this.chart.name;
    }
  }

  private calculatePointColor(key: string, value: number): PointColor {
    // check if threshold exists
    if (this.plotThreshold !== undefined) {
      const thresholdParam: ThresholdParam = this.plotThreshold.thresholdParams.find(th => th.contextSource.abbreviated === key);
      if (thresholdParam !== undefined && thresholdParam.isEnabled) {
        switch (this.plotThreshold.nonConformityDirection) {
          case 'DOWN':
            // taking care if the steps is 1
            if (this.layoutShapes.length > 1) {
              if (value < this.layoutShapes[this.layoutShapes.length - 1].y1) {
                return PointColor.DANGER;
              } else if (value > this.layoutShapes[this.layoutShapes.length - 1].y1
                && value < this.layoutShapes[this.layoutShapes.length - 2].y1) {
                return PointColor.WARNING;
              } else {
                return PointColor.OK;
              }
            } else {
              if (value < this.layoutShapes[this.layoutShapes.length - 1].y1) {
                return PointColor.DANGER;
              } else {
                return PointColor.OK;
              }
            }
          case 'UPDOWN':
            if (value > this.layoutShapes[this.layoutShapes.length - 1].y0 || value < this.layoutShapes[this.layoutShapes.length - 1].y1) {
              return PointColor.DANGER;
            } else {
              return PointColor.OK;
            }
          case 'UP':
            // taking care if the steps is 1
            if (this.layoutShapes.length > 1) {
              if (value > this.layoutShapes[this.layoutShapes.length - 1].y0) {
                return PointColor.DANGER;
              } else if (value < this.layoutShapes[this.layoutShapes.length - 1].y0
                && value > this.layoutShapes[this.layoutShapes.length - 2].y0) {
                return PointColor.WARNING;
              } else {
                return PointColor.OK;
              }
            } else {
              if (value > this.layoutShapes[this.layoutShapes.length - 1].y0) {
                return PointColor.DANGER;
              } else {
                return PointColor.OK;
              }
            }
          default:
            return null;
        }
      } else {
        return PointColor.OK;
      }
    } else {
      return PointColor.OK;
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
        }
      );
  }

}
