import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import { ChartParamsService } from '../../../services/chart-params.service';
declare var M: any;
/**
 * This main component for the chart management
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.css']
})
export class MainChartComponent implements OnInit {

  constructor(private chartService: ChartService,
    private chartParamsService: ChartParamsService) { }

  instance: any;


  ngOnInit() {
    const elem = document.getElementById('tabs');
    this.instance = M.Tabs.init(elem);
    // subscribe to tab change
    this.subscribeToTabChange();
    this.subscribeToReset();
  }
    
  private subscribeToReset(): void {
    this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {
          
        }
      )
  }  

  private subscribeToTabChange(): void {
    this.chartService.selectedTab$
    .subscribe(
      (tab) => {
        console.log('wut');
        this.instance.select(tab);
      }
    )
  }

}
