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
    this.serverData = [];
    this.trService.getForParetto(this.selectedLs).subscribe(
      res => {
        this.serverData = res;
        this.loadPlot();
        console.log(res);
      },
      err => {
        console.error(err);
      }
    )
  }

  private loadPlot() {
    let trace1 = {
      name: 'Problems',
      type: 'bar',
      x: this.serverData.map(element => element.troubleShootingName),
      y: this.serverData.map(element => element.value),
    };
    let trace2 = {
      name: 'Cumulative',
      type: 'scatter',
      mode: 'lines',

      x: this.serverData.map(element => element.troubleShootingName),
      y: this.serverData.map(element => element.cumulative),
      autobinx: true,
      autobiny: true
    }
    let data = [trace1, trace2];
    let layout = {
      title: 'Common problems',
      shapes: [],
      // colorway: traceColor.colorRange,
      hovermode: 'closest',
      xaxis: {
        nticks: 10,
      },
      yaxis: {
        type: 'linear',
      },

      currentDiv: 'plot'
    };
    Plotly.plot('plot', {
      data: data,
      layout: layout
    });
  }

}
