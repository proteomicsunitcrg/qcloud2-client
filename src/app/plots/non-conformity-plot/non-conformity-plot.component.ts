import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ContextSource } from '../../models/contextSource';
import { File } from '../../models/file';
import { Threshold } from '../../models/threshold';
import { GuideSet } from '../../models/guideSet';
import { DataService } from '../../services/data.service';
import { calculateMean, generateLayoutShapes, loadDataAndDatesArray, getPointColor, truncateFilename } from '../helper/plotUtilities';
import { ThresholdService } from '../../services/threshold.service';
import { PlotThreshold } from '../../models/plotThreshold';
import { ThresholdParam } from '../../models/thresholdParams';
import * as traceColor from '../plot/traceColors';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-non-conformity-plot',
  templateUrl: './non-conformity-plot.component.html',
  styleUrls: ['./non-conformity-plot.component.css']
})
export class NonConformityPlotComponent implements OnInit, OnChanges {

  constructor(private dataService: DataService,
    private thresholdService: ThresholdService) { }

  @Input() contextSource: ContextSource;

  @Input() file: File;

  @Input() threshold: Threshold;

  @Input() guideSet: GuideSet;

  serverData: { dates: any[], data: any[], names: any[] };

  layout: any;

  thresholdColors = ['#a9dbed', '#60c3e8', '#056487'];
  layoutShapes = [];

  plotThreshold: PlotThreshold;

  ngOnInit() {

  }
  ngOnChanges() {
    this.loadNonConformityPlotData();
  }

  private loadNonConformityPlotData(): void {
    this.dataService.getNonConformityPlotData(this.file.labSystem.apiKey,
      this.threshold.param.qCCV,
      this.contextSource.apiKey,
      this.file.sampleType.qualityControlControlledVocabulary,
      this.file.checksum,
      this.guideSet)
      .subscribe(
        (dataForPlot) => {
          this.serverData = loadDataAndDatesArray(dataForPlot);
          if (this.guideSet === null) {
            this.loadNonConformityPlotThresholdWithoutGuideSet(this.threshold.apiKey, this.file.checksum, this.contextSource.apiKey);
          } else {
            this.loadNonConformityPlotThresholdWithGuideSet(this.threshold.apiKey);
          }

        }
      );
  }

  loadNonConformityPlotThresholdWithGuideSet(thresholdApiKey: string): void {
    console.log('with guideset');
  }

  private loadNonConformityPlotThresholdWithoutGuideSet(thresholdApiKey: string, fileChecksum: string, contextSourceApiKey: string): void {
    this.thresholdService.getNonConformityPlotThreshold(thresholdApiKey, fileChecksum, contextSourceApiKey)
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
    this.loadPlot();
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
          // let color = this.calculatePointColor(key, element);
          const color = getPointColor(element['nc']);
          const elementText = element['value'];
          const value = element['value'];

          if (index === this.serverData.data[key].length - 1) {
            marker = 'diamond-cross';
          }

          values.push(value);
          colorsForLine[index] = color;
          markersForLine[index] = marker;
          textArray[index] = elementText + '<br>' + truncateFilename(this.serverData.data['filename'][index], 20);
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
    }


    this.layout = {
      title: this.generateNonConformityPlotTitle(),
      shapes: [],
      colorway: traceColor.colorRange,
      hovermode: 'closest',
      xaxis: {
        nticks: 10,
      },
      yaxis: {
        type: 'linear',
        // range: [MINVALUEFORPLOT, MAXVALUEFORPLOT]
      },
      currentDiv: 'plot'
    };
    this.layout.shapes = this.layoutShapes;
    Plotly.react('plot', dataForPlot, this.layout);

  }

  private generateNonConformityPlotTitle(): string {
    return this.threshold.param.name + ' ' + this.contextSource.abbreviated;
  }

}
