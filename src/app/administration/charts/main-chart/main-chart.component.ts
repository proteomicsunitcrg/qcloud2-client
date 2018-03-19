import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { ChartService } from '../../../services/chart.service';
@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.css']
})
export class MainChartComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  instance: any;


  ngOnInit() {
    const elem = document.getElementById('tabs');
    this.instance = M.Tabs.init(elem);
    // subscribe to tab change
    this.subscribeToTabChange();
    
  }
  private subscribeToTabChange(): void {
    this.chartService.selectedTab$
    .subscribe(
      (tab) => {
        this.instance.select(tab);
      }
    )
  }

}
