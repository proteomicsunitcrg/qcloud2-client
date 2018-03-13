import { Component, OnInit, Input } from '@angular/core';
import { Chart } from '../../models/chart';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  constructor() { }

  @Input() chart: Chart;

  ngOnInit() {
    console.log(this.chart.name);
  }

}
