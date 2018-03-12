import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadTestPlot();
  }
  private loadTestPlot(): void {
    let datesArray = [];
    let dataArray = [];

    this.dataService.getTestData()
      .subscribe(
        (dataFromServer) => {
          Object.keys(dataFromServer).forEach(function (key) {
            datesArray.push(key);
            Object.keys(dataFromServer[key]).forEach(
              (element) => {
                if (dataArray[element] == undefined) {
                  dataArray[element] = [];
                }
                dataArray[element].push(dataFromServer[key][element]);
              }
            )
          });
        }, (e) => console.log(e),
        () => this.loadPlot(datesArray, dataArray)

      )

  }
  private loadPlot(datesArray, dataArray): void {
    console.log(dataArray);
    let dataForPlot = [];


    for (let key in dataArray) {      
      if(key ==='filename') {
        continue;
      }
      let values = [];
      dataArray[key].forEach(
        (element, index) => {
          values.push(Math.log2(element));
        }
      );

      var trace = {
        x: datesArray,
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        connectgaps: false,
        name: key,
        description: 'number of ' + key,
        filenames: dataArray['filename'],
        hoverinfo: 'y+x+text',
        hovertext: dataArray['filename']
      }
      dataForPlot.push(trace);
    }
    var layout = {
      title: 'Total numbers',
      shapes: [],
      hovermode: 'closest',
      width: 600,
      xaxis: {
        nticks: 10,
      },
      sampleType: 'bsa',
      currentDiv: 'plot'
    };
    Plotly.newPlot('plot', dataForPlot, layout);
  }

}
