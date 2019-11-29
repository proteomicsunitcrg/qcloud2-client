import { PlotService } from '../../services/plot.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { File } from '../../models/file';
import { DataService } from '../../services/data.service';
import * as Plotly from 'plotly.js/dist/plotly';
@Component({
  selector: 'app-isotopologue-plot',
  templateUrl: './isotopologue-plot.component.html',
  styleUrls: ['./isotopologue-plot.component.css']
})
export class IsotopologuePlotComponent implements OnInit, OnDestroy {

  constructor(private plotService: PlotService,
    private dataService: DataService) { }

  @Input() abbreviatedIsotopologueName: string;

  @Input() cleanedSequence: string;

  fileChecksum$: Subscription;

  layout: any;

  @Input() file: File;

  ngOnInit() {
    this.subscribeToPlotFile();
  }

  private subscribeToPlotFile(): void {
    this.fileChecksum$ = this.plotService.fileChecksum$
      .subscribe(
        (checksum) => {
          this.file = new File(null, null, null, null, null, checksum, null);
          this.loadPlotData();
        }, err => console.log('err', err)
      );
    this.loadPlotData();
  }

  private loadPlotData(): void {
    const dataArray = [];
    this.dataService.getIsotopologuePlotData(this.file, this.abbreviatedIsotopologueName)
      .subscribe(
        (data) => {

          Object.keys(data).forEach(
            (key) => {
              Object.keys(data[key]).forEach(
                (element) => {
                  if (dataArray[element] === undefined) {
                    dataArray[element] = [];
                  }
                  dataArray[element].push(data[key][element]);
                }
              );
            }
          );
        }, err => console.log(err),
        () => {
          this.loadIsoPlot(dataArray);
        }
      );
  }

  private loadIsoPlot(dataArray: any): void {
    const dataForPlot = [];
    for (const key in dataArray) {
      if (key === 'filename') {
        continue;
      }
      const values = [];
      dataArray[key].forEach(
        (element, index) => {
          if (isNaN(element['value'])) {
            values[key] = null;
          } else {
            values[key] = element['value'];
          }
        }
      );
      const k = [];
      const v = [];
      v.push(values[key]);
      k.push(parseFloat(key));
      const trace = {
        x: k,
        y: v,
        type: 'scatter',
        mode: 'markers',
        marker: {
          size: 5
        },
        line: {
          // color: colorsForLine,
        },
        connectgaps: false,
        name: key,
        description: 'number of ' + key,
        hoverinfo: 'y+x+text',
        hovertext: dataArray['filename']
      };
      dataForPlot.push(trace);
    }
    this.layout = {
      title: this.cleanedSequence,
      shapes: this.getAllShapes(dataArray),
      hovermode: 'closest',
      xaxis: {
        type: 'log'
      },
      yaxis: {
        type: 'linear',
      },
      currentDiv: 'plot'
    };
    Plotly.react('isoplot' + this.abbreviatedIsotopologueName, dataForPlot, this.layout);
  }

  private getAllShapes(dataArray) {
    const shapes = this.drawConnectedLines(dataArray);
    // shapes.push(this.drawDiagonal(dataArray));
    return shapes;
  }

  private drawConnectedLines(dataObject) {
    let previous = [];
    const allShaperinos = [];
    for (const key in dataObject) {
      if (key === 'filename') {
        continue;
      }
      if (dataObject[key][0]['value'] !== 'NaN') {
        if (previous.length !== 0) {
          allShaperinos.push(this.drawLinerino(previous, dataObject[key][0]['value'], key));
          previous = [];
        }
        previous.push(dataObject[key][0]['value']);
        previous.push(key);
      } else {
        continue;
      }
    }
    return allShaperinos;
  }
  private drawLinerino(previous: any[], valueNow: string, keyNow: string) {
    const shape = {
      type: 'line',
      x0: previous[1],
      y0: previous[0],
      x1: keyNow,
      y1: valueNow,
      fillcolor: 'blue',
      opacity: 1,
      line: {
        color: 'blue',
        width: 1,
        dash: 'dot'
      },
      layer: 'below'
    };
    return shape;
  }

  private drawDiagonal(dataArray: any) {
    const num100 = dataArray['100.0'][0];
    const logi = Math.log10(0.1 + num100.value - 100);
    // const logi = 20.87
    // console.log(logi);
    const shape = {
      type: 'line',
      x0: (0.1),
      y0: logi,
      x1: (100.0),  // punt
      y1: Math.log10(num100.value), // punt
      fillcolor: 'grey',
      opacity: 1,
      line: {
        color: 'grey',
        width: 1
      },
      layer: 'above'
    };
    return shape;
  }

  ngOnDestroy() {
    this.fileChecksum$.unsubscribe();
  }

}
