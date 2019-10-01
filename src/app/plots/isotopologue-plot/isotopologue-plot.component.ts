import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PlotService } from '../../services/plot.service';
import { Subscription } from 'rxjs';
import { File } from '../../models/file';
import { DataService } from '../../services/data.service';
import * as Plotly from 'plotly.js/dist/plotly';
import { OverlayKeyboardDispatcher } from '@angular/cdk/overlay';

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
          this.file = new File(null, null, null, null, null, checksum);
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
      k.push(key);
      const trace = {
        x: k,
        y: v,
        type: 'scatter',
        mode: 'lines+markers',
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
      // shapes: [this.drawDiagonal(dataArray)],
      shapes: [this.drawConnectedLines(dataArray)],
      hovermode: 'closest',
      xaxis: {
        type: 'category'
      },
      yaxis: {
        // type: 'linear',
      },
      currentDiv: 'plot'
    };    
    Plotly.react('isoplot' + this.abbreviatedIsotopologueName, dataForPlot, this.layout);
  }

  private drawConnectedLines(dataArray) {
    Object.keys(dataArray).forEach((key) => {
      console.log(dataArray[key])
      

    });
    
  }
  private drawDiagonal(dataArray: any) {
    const num100 = dataArray['100.0'][0];
    const shape = {
      type: 'line',
      x0: -22.5,
      y0: 20,
      x1: '100.0',
      y1: num100.value,
      fillcolor: 'red',
      opacity: 1,
      line: {
        color: 'red',
        width: 3
      },
      layer: 'above'
    };
    return shape;
  }

  ngOnDestroy() {
    this.fileChecksum$.unsubscribe();
  }

}
