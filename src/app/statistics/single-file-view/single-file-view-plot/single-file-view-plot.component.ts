import { Component, Input, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js/dist/plotly';

declare var M: any;

@Component({
  selector: 'app-single-file-view-plot',
  templateUrl: './single-file-view-plot.component.html',
  styleUrls: ['./single-file-view-plot.component.css']
})
export class SingleFileViewPlotComponent implements OnInit {

  @Input('file') file;

  constructor() { }

  ngOnInit() {
    this.drawSingleFilePlot();
  }

  private gaussianRand(): number {
    var rand = 0;
    for (var i = 0; i < 6; i += 1) {
      rand += Math.random();
    }
    return (rand / 6) - 0.5;
  }

  private drawSingleFilePlot(): void {
    var X = [],
      Y = [],
      n = 1000000,
      i;

    for (i = 0; i < n; i += 1) {
      X.push(this.gaussianRand());
      Y.push(this.gaussianRand());
    }

    var data = [{
      type: "scattergl",
      mode: "markers",
      marker: {
        color: 'rgb(152, 0, 0)',
        line: {
          width: 1,
          color: 'rgb(0,0,0)'
        }
      },
      x: X,
      y: Y
    }]
    console.log(data);
    const layout = {
      height: 600,
      width: 2400,
    }
    Plotly.newPlot('myDiv', data, layout);
  }

}
