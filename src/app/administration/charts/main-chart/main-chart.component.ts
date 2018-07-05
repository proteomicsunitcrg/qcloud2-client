import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import { ChartParamsService } from '../../../services/chart-params.service';
import { Subscription } from 'rxjs';
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
export class MainChartComponent implements OnInit, OnDestroy {

  constructor(private chartService: ChartService,
    private chartParamsService: ChartParamsService) { }

  instance: any;

  resetComponent$: Subscription;
  selectedTab$: Subscription;

  ngOnInit() {
    const elem = document.getElementById('tabs');
    this.instance = M.Tabs.init(elem);
    // subscribe to tab change
    this.subscribeToTabChange();
    this.subscribeToReset();
  }

  ngOnDestroy() {
    this.resetComponent$.unsubscribe();
    this.selectedTab$.unsubscribe();
  }

  private subscribeToReset(): void {
    this.resetComponent$ = this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {

        }
      );
  }

  private subscribeToTabChange(): void {
    this.selectedTab$ = this.chartService.selectedTab$
      .subscribe(
        (tab) => {
          this.instance.select(tab);
        }
      );
  }

}
