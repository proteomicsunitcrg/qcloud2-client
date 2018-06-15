import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PlotService } from '../../services/plot.service';
import { Subscription } from 'rxjs/Subscription';
import { File } from '../../models/file';
import { FileService } from '../../services/file.service';
import { DataService } from '../../services/data.service';
import * as Plotly from 'plotly.js';
import { delay } from 'q';

@Component({
  selector: 'app-isotopologue-plot',
  templateUrl: './isotopologue-plot.component.html',
  styleUrls: ['./isotopologue-plot.component.css']
})
export class IsotopologuePlotComponent implements OnInit, OnDestroy {

  constructor(private plotService: PlotService,
    private fileService: FileService,
    private dataService: DataService) { }

  @Input() abbreviatedIsotopologueName: string;

  @Input() cleanedSequence: string;

  plotFilename$: Subscription;

  layout: any;

  @Input() file: File;

  ngOnInit() {
    this.subscribeToPlotFile();
  }

  private subscribeToPlotFile(): void {
    this.plotFilename$ = this.plotService.filenameFromPlot$
      .subscribe(
        (filename) => {
          this.fileService.getFileByFilename(filename)
          .subscribe(
            (file) => {
              this.file = file;
            }
          );
        }
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
          if (isNaN(element)) {
            values[key] = null;
          } else {
            values[key] = element;
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
      shapes: [],
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

  ngOnDestroy() {
    this.plotFilename$.unsubscribe();
  }

}
