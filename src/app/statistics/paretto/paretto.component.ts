import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../services/system.service';
import { System } from '../../models/system';
declare var M: any;
import * as Plotly from 'plotly.js/dist/plotly';
import { TroubleshootingService } from '../../services/troubleshooting.service';

@Component({
  selector: 'app-paretto',
  templateUrl: './paretto.component.html',
  styleUrls: ['./paretto.component.css']
})
export class ParettoComponent implements OnInit {

  constructor(private lsService: SystemService, private trService: TroubleshootingService) { }

  allLs: System[] = [];

  selectedLs: System;

  serverData: any[];

  ngOnInit() {
    this.getUserLs();
  }


  private getUserLs(): void {
    this.lsService.getSystems().subscribe(
      res => {
        this.allLs = res;
        setTimeout(() => {  // The timeout is necessary because the select isnt instant
          M.AutoInit();
        }, 1000);
      },
        err => {
          console.error(err);
        }
    );
  }

  public changeLs(event): void {
    // Plotly.deleteTraces('plot1', 0);
    // Plotly.deleteTraces('plot2', 0);
    this.serverData = [];
    this.trService.getForParetto(this.selectedLs, 'PROBLEM').subscribe(
      res => {
        this.serverData = res;
        this.loadPlot('plot1', 'problems');
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
    this.trService.getForParetto(this.selectedLs, 'ACTION').subscribe(
      res => {
        this.serverData = res;
        this.loadPlot('plot2', 'actions');
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

  private loadPlot(plotDiv: string, type: string) {
    let trace1 = {
      name: 'Problems',
      type: 'bar',
      x: this.serverData.map(element => element.troubleShootingName),
      y: this.serverData.map(element => element.value),
      yaxis: 'y1'
    };
    let trace2 = {
      name: 'Cumulative',
      type: 'scatter',
      mode: 'lines',

      x: this.serverData.map(element => element.troubleShootingName),
      y: this.serverData.map(element => element.cumulative),
      autobinx: true,
      autobiny: true,
      yaxis: 'y2'
    }
    let data = [trace1, trace2];
    let layout = {
      title: `Common ${type}`,
      shapes: [],
      // colorway: traceColor.colorRange,
      hovermode: 'closest',
      xaxis: {
        nticks: 10,
      },
      yaxis: {
        type: 'linear',
        ticks: '',
        mirror: false,
        nticks: 0,
        ticklen: 6,
        showgrid: true,

        tickmode: 'auto',

        autorange: true,
        // gridcolor: '#add8e6',
        // gridwidth: 1,
        rangemode: 'normal',
        tickangle: 'auto',
        tickcolor: 'rgba(0, 0, 0, 0)',
        ticksuffix: '',
        showexponent: 'all',
        zerolinecolor: '#444',
        zerolinewidth: 1,
        exponentformat: 'B',
        showticklabels: true
      },
      yaxis2: {
        side: 'right',
        type: 'linear',
        anchor: 'x',

        autorange: true,
        // gridcolor: 'blue',
        // gridwidth: 1,
        overlaying: 'y',
        ticksuffix: '%',
        showticklabels: true
      },

      currentDiv: plotDiv
    };
    Plotly.newPlot(plotDiv, {
      data: data,
      layout: layout
    });
  }

}
