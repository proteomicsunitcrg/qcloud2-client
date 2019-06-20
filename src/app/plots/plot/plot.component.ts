import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js/dist/plotly';
import { delay } from 'q';
import { Subscription } from 'rxjs';
import { Annotation } from '../../models/annotation';
import { Chart } from '../../models/chart';
import { PlotThreshold } from '../../models/plotThreshold';
import { PlotTrace } from '../../models/plotTrace';
import { System } from '../../models/system';
import { ThresholdParam } from '../../models/thresholdParams';
import { TraceColor } from '../../models/TraceColor';
import { AnnotationService } from '../../services/annotation.service';
import { DataService } from '../../services/data.service';
import { PlotService } from '../../services/plot.service';
import { ThresholdService } from '../../services/threshold.service';
import { WebsocketService } from '../../services/websocket.service';
import { HtmlPlotComponent } from '../helper/html-plot.component';
import { generateLayoutShapes, truncateFilename } from '../helper/plotUtilities';
import { PointColor } from './pointColor';
import * as traceColor from './traceColors';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})


export class PlotComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataService,
    private thresholdService: ThresholdService,
    private plotService: PlotService,
    private webSocketService: WebsocketService,
    private annotationService: AnnotationService) { }

  @Input() chart: Chart;
  @Input() system: System;

  @Input() hideAnnotations: Boolean;
  /**
   * If it is true it means that this plot is in a user view.
   * In that case we need to add to the chart name the
   * labsystem name and the sample type name.
   */
  @Input() shownames: boolean;

  currentDates: string[];
  annotations: Annotation[];

  dateChangesSubscription$: Subscription;
  hideAnnotationsSubscription$: Subscription;
  webSocketData$: Subscription;
  thresholdFromWebSocket$: Subscription;

  /**
   * Annotations will load after the data is displayed
   */
  annotations$: Subscription;

  /**
   * This subscriptions will be enabled only if the user is in
   * a default view.
   */
  annotationFromWebSocket$: Subscription;
  deleteAnnotationFromWebSocket$: Subscription;
  updateAnnotationFromWebSocket$: Subscription;

  errorMessage: string;
  error: boolean;
  loaded = false;
  noData = true;

  layout: any;

  serverData: PlotTrace[];

  layoutShapes = [];

  traceColorsByKey = [];

  plotThreshold: PlotThreshold;

  ngOnInit() {
    this.subscribeHideAnnotations();
    this.loadHideAnnotations();
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
    this.annotations$.unsubscribe();
    this.dateChangesSubscription$.unsubscribe();
    this.webSocketData$.unsubscribe();
    this.thresholdFromWebSocket$.unsubscribe();
    if (this.serverData !== undefined && this.serverData.length > 0 && !this.shownames) {
      this.annotations$.unsubscribe();
      this.annotationFromWebSocket$.unsubscribe();
      this.deleteAnnotationFromWebSocket$.unsubscribe();
      this.updateAnnotationFromWebSocket$.unsubscribe();
      this.annotations$.unsubscribe();
    }
  }

  private loadData(): void {
    this.dataService.getPlotTraceData(this.chart, this.system)
      .subscribe(
        (dataFromServer) => {
          this.serverData = dataFromServer;
          this.enableAnnotationSubscriptions();
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

  enableAnnotationSubscriptions(): void {
    if (this.serverData !== undefined && this.serverData.length > 0 && !this.shownames) {
      this.subscribeToWebSocketAnnotations();
      this.subscribeToWebSocketDeleteAnnotations();
      this.subscribeToWebSocketUpdateAnnotations();
    }
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
              const plot = document.getElementById('plot' + this.chart.id);
              const color = [];
              const text = [];
              const yValues = [];
              const xValues = [];
              plot['data'].forEach(
                (trace) => {
                  const websocketTrace = this.getCorrectTraceFromWebsocketTraces(trace.name, res.body);
                  const serverDataTrace = this.getTraceFromServerData(trace.name);
                  // websocketTrace.traceColor = new TraceColor(websocketTrace.traceColor.mainColor, websocketTrace.traceColor.apiKey);
                  websocketTrace.traceColor = new TraceColor(serverDataTrace.traceColor.mainColor, serverDataTrace.traceColor.apiKey);
                  const status = this.calculatePointColor(trace.name, websocketTrace.plotTracePoints[0].value);
                  xValues.push([websocketTrace.plotTracePoints[0].file.creationDate]);
                  yValues.push([websocketTrace.plotTracePoints[0].value]);
                  color.push([this.getPointColorFromTracePointColors(websocketTrace.traceColor, websocketTrace.shade, status)]);
                  text.push([yValues[yValues.length - 1] + '<br>' +
                    truncateFilename(websocketTrace.plotTracePoints[0].file.filename, 50)]);
                }
              );
              Plotly.extendTraces('plot' + this.chart.id, {
                'marker.color': color,
                y: yValues,
                x: xValues,
                hovertext: text
              }, Array.apply(null, { length: xValues.length }).map(Number.call, Number));

            }

          }
        }
      );
  }

  private getCorrectTraceFromWebsocketTraces(abbreviated: string, traces: any[]): any {
    return traces.find(trace => {
      return trace.abbreviated === abbreviated;
    });
  }

  private getTraceFromServerData(abbreviated: String): any {
    return this.serverData.find(trace => {
      return trace.abbreviated === abbreviated;
    });
  }

  private getPointColorFromTracePointColors(color: TraceColor, shadeGrade: number, status: PointColor): string {
    switch (status) {
      case PointColor.OK:
        return color.shades[shadeGrade];
      case PointColor.WARNING:
        return 'yellow';
      case PointColor.DANGER:
        return 'red';
      default:
        return color.shades[shadeGrade];
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
        this.loadPlot();
      }
      );
  }

  private drawThreshold(): void {
    this.layoutShapes = [];
    // if there is only one context source load only this.
    // this prevents a sigma threshold do be drawed more than once
    let uniqueThresholdParam: ThresholdParam = null;

    if (this.serverData.length === 1) {
      uniqueThresholdParam = this.plotThreshold.thresholdParams.find(tp => tp.contextSource.abbreviated === this.serverData[0].abbreviated);
      // console.log(uniqueThresholdParam);
      
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

    if (error.error === undefined) {
      this.errorMessage = error.message;
    } else {
      this.errorMessage = error.error.message;
    }

  }

  private loadPlot(): void {
    const minValues = [];
    const maxValues = [];

    const dataForPlot = [];
    // console.log(this.serverData);
    
    this.serverData.forEach(
      (plotTrace) => {
        const values = [];
        const filenames = [];
        const dates = [];
        const color = [];
        const text = [];
        const checksums = [];
        plotTrace.plotTracePoints.forEach(
          (plotTracePoint) => {
            values.push(plotTracePoint.value);
            filenames.push(plotTracePoint.file.filename);
            dates.push(plotTracePoint.file.creationDate);
            const status = this.calculatePointColor(plotTrace.abbreviated, plotTracePoint.value);
            // const status = plotTracePoint.nonConformityStatus;
            color.push(this.getPointColorFromTracePointColors(plotTrace.traceColor, plotTrace.shade, status));
            text.push(plotTracePoint.value + '<br>' + truncateFilename(plotTracePoint.file.filename, 50));
            checksums.push(plotTracePoint.file.checksum);
          }
        );
        minValues.push(Math.min.apply(null, values.filter((n) => !isNaN(n))));
        maxValues.push(Math.max.apply(null, values.filter((n) => !isNaN(n))));
        const trace = {
          x: dates,
          y: values,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {
            color: color,
            size: 5
          },
          line: {
            color: plotTrace.traceColor.shades[plotTrace.shade],
          },
          connectgaps: false,
          name: plotTrace.abbreviated,
          description: 'number of ' + plotTrace.abbreviated,
          filenames: filenames,
          hoverinfo: 'x+text',
          hovertext: text,
          checksums: checksums
        };

        dataForPlot.push(trace);
      });

    let MINVALUEFORPLOT;
    let MAXVALUEFORPLOT;

    MINVALUEFORPLOT = Math.min.apply(null, minValues) - Math.abs((Math.min.apply(null, minValues) * 0.1));
    MAXVALUEFORPLOT = Math.max.apply(null, maxValues) + (Math.max.apply(null, maxValues) * 0.1);
    // dataForPlot.push({
    //     x: ["2019-05-13 00:17:58","2019-05-13 04:59:29","2019-05-13 09:41:08","2019-05-13 15:19:19","2019-05-13 20:32:02","2019-05-14 01:44:29","2019-05-14 06:56:31","2019-05-14 12:09:19","2019-05-14 17:23:12","2019-05-14 22:36:49","2019-05-14 23:52:28","2019-05-15 03:19:29","2019-05-15 08:50:25","2019-05-15 10:05:21","2019-05-15 23:53:19","2019-05-16 01:20:32","2019-05-16 07:23:11","2019-05-16 12:44:47","2019-05-17 16:32:07","2019-05-17 21:49:43","2019-05-18 03:07:42","2019-05-18 08:26:15","2019-05-18 13:46:13","2019-05-18 19:06:53","2019-05-18 20:25:40","2019-05-18 23:58:48","2019-05-19 05:13:04","2019-05-19 10:28:28","2019-05-19 11:48:04","2019-05-19 17:37:38","2019-05-19 22:33:08","2019-05-20 03:30:20","2019-05-20 08:29:07","2019-05-20 13:30:10","2019-05-20 18:32:56","2019-05-20 23:36:49","2019-05-21 04:41:53","2019-05-21 09:49:10","2019-05-21 13:33:22","2019-05-21 18:45:35","2019-05-21 23:56:36","2019-05-22 05:07:49","2019-05-22 10:21:40","2019-05-22 15:37:25","2019-05-22 20:54:40","2019-05-23 02:11:11","2019-05-23 07:28:04","2019-05-28 11:36:58","2019-05-28 12:55:11","2019-05-28 16:00:12","2019-05-28 19:04:11","2019-05-28 20:08:33","2019-05-29 00:17:29","2019-05-29 04:57:20","2019-05-29 06:02:22","2019-05-29 07:07:46","2019-05-29 08:55:04","2019-05-29 13:06:20","2019-05-29 17:18:00","2019-05-29 21:29:59","2019-05-30 01:42:01","2019-05-30 05:54:13","2019-05-30 10:06:52","2019-05-30 14:19:45","2019-05-30 18:32:00","2019-05-30 22:44:12","2019-05-31 03:52:16","2019-05-31 09:15:20","2019-05-31 13:29:17","2019-05-31 21:57:09","2019-06-01 02:11:17","2019-06-01 06:25:46","2019-06-01 10:39:47","2019-06-01 14:53:43","2019-06-01 18:01:39","2019-06-01 22:16:20","2019-06-02 02:31:16","2019-06-02 06:45:05","2019-06-02 10:59:24","2019-06-02 15:14:10","2019-06-02 16:20:46","2019-06-02 17:27:20","2019-06-02 21:42:24","2019-06-02 22:49:08","2019-06-02 23:55:55","2019-06-03 01:02:47","2019-06-03 05:19:12"],
    //     y: [5.1682,5.44505,5.03208,5.10672,5.55251,5.76974,6.41732,5.70741,6.36101,7.12117,7.19064,6.8095,4.79064,5.3455,6.27284,6.23155,6.42276,6.33846,7.31175,7.17175,6.96524,6.79963,6.01325,6.4785,6.42709,7.28536,6.85882,6.44087,6.4179,6.82374,6.54312,6.48865,6.58971,5.7896,6.08079,6.31209,6.20252,4.49084,5.25035,5.17287,5.93859,5.6266,4.26996,4.72806,5.40021,5.2083,5.05614,4.73259,5.52205,7.41932,6.41981,8.11654,6.24793,6.21041,6.19199,5.14429,4.66905,4.82988,6.49752,6.35233,6.42117,6.31917,4.37384,6.15498,5.97806,6.46854,6.63851,5.20216,5.70183,5.78652,6.10912,6.20649,6.16423,5.83169,6.1992,6.54509,6.43309,6.06838,6.1868,5.99355,6.02967,5.99722,6.10353,6.16336,6.13358,6.26917,6.43489,7.2,8],
    //     filename: "caca",
    //     type: 'scatter',
    //     mode: 'markers',
    //     description: 'File error',
    //     name: 'Errors',
    //     hoverinfo: 'text+x',
    //     hovertext: 'File error',
    //     marker: {
    //         symbol: 'x-dot',
    //         size: 10,
    //         color: 'red'
    //     }
    // })
    // console.log(JSON.stringify(dataForPlot[0].y));
    
    const range = Math.abs(MAXVALUEFORPLOT) + Math.abs(MINVALUEFORPLOT);

    const rangeArray = [];

    if (range > 5) {
      rangeArray[0] = MINVALUEFORPLOT;
      rangeArray[1] = MAXVALUEFORPLOT;
    } else {
      rangeArray[0] = (range * -1) * 3;
      rangeArray[1] = range * 3;
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
        range: rangeArray
      },
      sampleType: this.chart.sampleType.name,
      currentDiv: 'plot'
    };
    if (dataForPlot.length > 0) {
      this.layout.shapes = this.layoutShapes;
    }
    this.loaded = true;
    this.noData = true;
    if (this.serverData.length > 0) {
      Plotly.react('plot' + this.chart.id, dataForPlot, this.layout, { showLink: true });
      const plot = <HtmlPlotComponent>document.getElementById('plot' + this.chart.id);
      plot.on('plotly_click', (data) => {
        this.plotService.sendClick(data, this.system);
      });
      // Call for annotations
      if (!this.shownames && (this.hideAnnotations === false || this.hideAnnotations === undefined)) {
        delay(100).then(() => this.loadAnnotations());

      }
    } else {
      Plotly.purge('plot' + this.chart.id);
      this.noData = false;
    }
  }

  private loadAnnotations(): void {
    this.annotations$ = this.annotationService.annotations$.subscribe(
      (annotations) => {
        this.annotations = annotations;
        if (annotations.length > 0) {
          this.drawAnnotations();
        }
      }, err => console.log(err)
    );
  }

  private subscribeToWebSocketAnnotations(): void {
    this.annotationFromWebSocket$ = this.webSocketService.newAnnotationFromWebSocket$
      .subscribe(
        (annotation) => {
          if (this.serverData.length > 0 && this.system.apiKey === annotation.body.labSystem.apiKey) {
            if (this.annotations.findIndex(a => a.apiKey === annotation.body.apiKey) === -1) {
              this.annotations.push(annotation.body);
            }
            this.drawAnnotations();
          }
        }
      );
  }

  private subscribeToWebSocketDeleteAnnotations(): void {
    this.deleteAnnotationFromWebSocket$ = this.webSocketService.deleteAnnotationFromWebSocket$
      .subscribe(
        (annotation) => {
          if (this.serverData.length > 0) {
            const annotationIndex = this.annotations.findIndex(a => a.apiKey === annotation.body);
            if (annotationIndex !== -1) {
              this.annotations.splice(annotationIndex, 1);
            }
            this.drawAnnotations();
          }
        }
      );
  }

  private subscribeToWebSocketUpdateAnnotations(): void {
    this.updateAnnotationFromWebSocket$ = this.webSocketService.updateAnnotationFromWebSocket$
      .subscribe(
        (annotation) => {
          if (this.serverData.length > 0 && this.system.apiKey === annotation.body.labSystem.apiKey) {
            const annotationIndex = this.annotations.findIndex(a => a.apiKey === annotation.body.apiKey);
            if (annotationIndex !== -1) {
              this.annotations[annotationIndex] = annotation.body;
              this.drawAnnotations();
            }
          }

        }
      );
  }

  private drawAnnotations(): void {
    const lines = [];
    const annotations = [];


    this.annotations.forEach(
      (annotation) => {
        let text = '';
        annotation.problems.forEach(p => text += p.name + '-');
        annotation.actions.forEach(p => text += p.name + '-');
        text = text.slice(0, -1);
        if (text.split('-').length > 2) {
          text = 'Click on any point to see the annotations.';
        }

        lines.push({
          type: 'line',
          x0: annotation.date,
          x1: annotation.date,
          y0: 0,
          y1: 1,
          yref: 'paper',
          line: {
            width: 1,
          }
        });

        annotations.push({
          x: annotation.date,
          xref: 'x',
          yref: 'y',
          text: text,
          fullText: 'fulltext',
          textangle: 270,
          showarrow: false,
          arrowhead: 3,
          arrowwidth: 0.1,
          arrowcolor: 'white',
          standoff: 100,
          xshift: 10,
          yanchor: 'middle',
          textposition: 'bottom',
        });

      });

    const shapesUpdate = this.layout.shapes.filter(s => s.type !== 'line');

    lines.forEach(l => {
      shapesUpdate.push(l);
    });

    const layoutUpdate = {
      ...this.layout,
      shapes: shapesUpdate,
      annotations: annotations
    };

    Plotly.relayout('plot' + this.chart.id, layoutUpdate);
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
      // console.log(this.plotThreshold);
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

  private loadHideAnnotations(): void {
    this.hideAnnotations = this.dataService.getHideAnnotations();
  }

  private subscribeHideAnnotations(): void {
    this.hideAnnotationsSubscription$ = this.dataService.annotationsOption$.subscribe(
      (res) => {
        this.hideAnnotations = res;
        this.loadData();
      }
    );
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
