import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js/dist/plotly';
import { Subscription } from 'rxjs';
import { Chart } from '../../models/chart';
import { LabSystemStatus } from '../../models/labsystemstatus';
import { PlotThreshold } from '../../models/plotThreshold';
import { ThresholdParam } from '../../models/thresholdParams';
import { DataService } from '../../services/data.service';
import { ThresholdService } from '../../services/threshold.service';
import { calculateMean, generateLayoutShapes, getPointColor, loadDataAndDatesArray, truncateString } from '../helper/plotUtilities';
import * as traceColor from '../plot/traceColors';


@Component({
  selector: 'app-auto-plot',
  templateUrl: './auto-plot.component.html',
  styleUrls: ['./auto-plot.component.css']
})
export class AutoPlotComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private thresholdService: ThresholdService,
    private dataService: DataService) { }


  @Input() labSystemStatus: LabSystemStatus;
  @Input() chart: Chart;

  selectedLabSystemStatus$: Subscription;

  loading: boolean;
  errorMessage: string;
  error: boolean;

  serverData: { dates: any[], data: any[], names: any[] };

  layout: any;

  thresholdColors = ['#a9dbed', '#60c3e8', '#056487'];
  layoutShapes = [];

  plotThreshold: PlotThreshold;


  ngOnInit() {
    this.subscribeToLabSystemStatus();
  }

  ngOnChanges() {
    if (this.labSystemStatus !== null || this.labSystemStatus !== undefined) {
      if (this.labSystemStatus.fileChecksum === null) {
        Plotly.purge('plot');
      } else {
        this.loadAutoPlotData(this.labSystemStatus);
      }
    }
  }

  ngOnDestroy() {
    this.selectedLabSystemStatus$.unsubscribe();
  }

  private subscribeToLabSystemStatus(): void {
    this.selectedLabSystemStatus$ = this.thresholdService.selectedLabSystemStatus$
      .subscribe(
        (selectedLabSystemStatus: LabSystemStatus) => {
          // retrieve data
          this.labSystemStatus = selectedLabSystemStatus;
          this.loadAutoPlotData(selectedLabSystemStatus);
        }
      );
  }

  private loadAutoPlotData(labSystemStatus: LabSystemStatus): void {
    // retrieve data
    this.dataService.getAutoPlotData(labSystemStatus)
      .subscribe(
        (dataForPlot) => {
          this.serverData = loadDataAndDatesArray(dataForPlot);
          this.loadAutoPlotThreshold(labSystemStatus);
        }, err => console.log(err)
      );
  }


  private loadAutoPlotThreshold(labSystemStatus: LabSystemStatus): void {
    // tslint:disable-next-line:max-line-length
    this.thresholdService.getNonConformityPlotThreshold(labSystemStatus.thresholdApiKey, labSystemStatus.fileChecksum, labSystemStatus.contextSource.apiKey)
      .subscribe((threshold) => {
        if (threshold != null) {
          this.plotThreshold = threshold;
          this.drawThreshold();
          this.loadPlot();
        } else {
          this.loadPlot();
        }
      },
        err => console.log(err));
  }

  private drawThreshold(): void {
    this.layoutShapes = [];
    // if there is only one context source load only this.
    // this prevents a sigma threshold do be drawed more than once
    let uniqueThresholdParam: ThresholdParam = null;
    if (this.serverData.names.length === 1) {
      uniqueThresholdParam = this.plotThreshold.thresholdParams.find(tp => tp.contextSource.abbreviated === this.serverData.names[0]);
      if (uniqueThresholdParam !== undefined) {
        generateLayoutShapes(uniqueThresholdParam, this.plotThreshold.steps).forEach(
          (layoutShape) => {
            this.layoutShapes.push(layoutShape);
          });
      }
    } else {
      this.plotThreshold.thresholdParams.forEach(
        (thresholdParam) => {
          generateLayoutShapes(thresholdParam, this.plotThreshold.steps).forEach(
            (layoutShape) => {
              this.layoutShapes.push(layoutShape);
            });
        }
      );
    }
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
          let color = 'blue'; // client issue #35: Now all the points are blue minus the last one
          const elementText = element['value'];
          const value = element['value'];
          if (index === this.serverData.data[key].length - 1) {
            marker = 'diamond-cross';
            color = getPointColor(element['nc']);
          }
          values.push(value);
          colorsForLine[index] = color;
          markersForLine[index] = marker;
          textArray[index] = elementText + '<br>' + truncateString(this.serverData.data['filename'][index], 50);
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

    if (this.plotThreshold === undefined) {
      MINVALUEFORPLOT = Math.min.apply(null, minValues) - Math.abs((Math.min.apply(null, minValues) * 0.1));
      MAXVALUEFORPLOT = Math.max.apply(null, maxValues) + (Math.max.apply(null, maxValues) * 0.1);
    } else {
      const height = (this.layoutShapes[this.layoutShapes.length - 1]['y0'] - this.layoutShapes[this.layoutShapes.length - 1]['y1']) * 0.3;
      MINVALUEFORPLOT = this.layoutShapes[this.layoutShapes.length - 1]['y1'] - height;
      MAXVALUEFORPLOT = this.layoutShapes[this.layoutShapes.length - 1]['y0'] + height;
      // this vars used in yaxys layout options as range: range: [MINVALUEFORPLOT, MAXVALUEFORPLOT]
      // puts the first zoom to the threshold, but now we
      // prefeer the autozoom to the data
    }


    this.layout = {
      // title: this.chart.name,
      title: this.generatePlotTitle(),
      shapes: [],
      colorway: traceColor.colorRange,
      hovermode: 'closest',
      xaxis: {
        nticks: 10,
      },
      yaxis: {
        type: 'linear',
      },
      currentDiv: 'plot'
    };
    this.layout.shapes = this.layoutShapes;
    Plotly.react('plot', dataForPlot, this.layout);

  }

  private generatePlotTitle(): string {
    // I do this because the object labsystemstatus oficially doesnt have the attribute sampleTypeName
    // and fails in compile
    const helper: any = this.labSystemStatus;
    return helper.sampleTypeName + ' ' + this.labSystemStatus.param.name + ' ' + this.labSystemStatus.contextSource.abbreviated;
  }

}
