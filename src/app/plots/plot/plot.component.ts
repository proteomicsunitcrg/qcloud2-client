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

  /**
   * Plot is single or double, loads different logo position
   */
  @Input() big: boolean;
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
    this.dateChangesSubscription$.unsubscribe();
    // this.webSocketData$.unsubscribe();
    this.thresholdFromWebSocket$.unsubscribe();
    if (this.serverData !== undefined && this.serverData.length > 0 && !this.shownames) {
      // this.annotationFromWebSocket$.unsubscribe();
      // this.deleteAnnotationFromWebSocket$.unsubscribe();
      // this.updateAnnotationFromWebSocket$.unsubscribe();
    }
  }

  private loadData(): void {
    this.dataService.getPlotTraceData(this.chart, this.system)
      .subscribe(
        (dataFromServer) => {
          dataFromServer.sort(this.compare);
          this.serverData = dataFromServer;
          this.enableAnnotationSubscriptions();
          if (this.chart.isThresholdEnabled) {
            this.loadThreshold();
          } else {
            this.layoutShapes = [];
            this.loadPlot();
          }
        }, (e) => {
          this.loadErrorPlot(e);
        }
      );
  }
  private compare(a: PlotTrace, b: PlotTrace ): number {
    if (a.contextSourceId < b.contextSourceId) {
      return -1;
    }
    if (a.contextSourceId > b.contextSourceId) {
      return 1;
    }
    return 0;
  }

  private enableAnnotationSubscriptions(): void {
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
            this.layoutShapes = [];
            this.loadPlot();
          }
        } else {
          this.layoutShapes = [];
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
    this.serverData.forEach(
      (plotTrace) => {
        const values = [];
        const filenames = [];
        const dates = [];
        const color = [];
        const text = [];
        let mode = 'lines+markers';
        let symbol = 'dot';
        const checksums = [];
        plotTrace.plotTracePoints.forEach(
          (plotTracePoint) => {
            values.push(plotTracePoint.value);
            filenames.push(plotTracePoint.file.filename);
            dates.push(plotTracePoint.file.creationDate);
            const status = this.calculatePointColor(plotTrace.abbreviated, plotTracePoint.value);
            // const status = plotTracePoint.nonConformityStatus;
            color.push(this.getPointColorFromTracePointColors(plotTrace.traceColor, plotTrace.shade, status));
            if (plotTrace.abbreviated === 'ERROR') {
              text.push('File error <br>' + truncateFilename(plotTracePoint.file.filename, 50));
              mode = 'markers';
            } else {
              text.push(plotTracePoint.value + '<br>' + truncateFilename(plotTracePoint.file.filename, 50));
            }
            checksums.push(plotTracePoint.file.checksum);
          }
        );
        if (plotTrace.abbreviated === 'ERROR') {
          symbol = 'x-dot';
        }
        const trace = {
          x: dates,
          y: values,
          type: 'scatter',
          mode: mode,
          marker: {
            color: color,
            size: 5,
            symbol: symbol
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
      if (!this.shownames && this.hideAnnotations === false) {
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
    if (this.hideAnnotations) {
      return ;
    }
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

    const shapesUpdate = this.layout.shapes;

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
