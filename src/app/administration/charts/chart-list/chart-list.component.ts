import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { ChartService } from '../../../services/chart.service';
import { CV } from '../../../models/cv';
import { Chart } from '../../../models/chart';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartParamsService } from '../../../services/chart-params.service';
import { Subscription } from 'rxjs/Subscription';
declare var M: any;

/**
 * This component list the existing charts
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit, OnDestroy {

  charts: Chart[];

  constructor(private cvService: CvService,
    private chartService: ChartService,
    private chartParamsService: ChartParamsService) { }

    resetComponent$: Subscription;
    selectedChartCv$: Subscription;

  ngOnInit() {
    this.loadAllCharts();
    this.subscribeToCVChange();
    this.subscribeToReset();
  }

  ngOnDestroy() {
    this.resetComponent$.unsubscribe();
    this.selectedChartCv$.unsubscribe();
  }

  private subscribeToReset(): void {
    this.resetComponent$ = this.chartParamsService.resetComponent$
      .subscribe(
        () => {
          this.loadAllCharts();
        }
      )
  }
  /**
   * Get all charts from the database
   */
  private loadAllCharts(): void {
    this.chartService.getAllCharts()
      .subscribe(
        (charts) => {
          this.loadChartsIntoList(charts);
        }
      )
  }
  /**
   * Load the charts by cv
   * @param cv the cv to look for its charts
   */
  private loadChartsByCV(cv: CV): void {
    this.chartService.getChartsByCV(cv)
      .subscribe(
        (charts) => {
          this.loadChartsIntoList(charts);
        }
      )
  }

  /**
   * Listen to any CV change at the
   * cv component selector and reload the list
   */
  private subscribeToCVChange(): void {
    this.selectedChartCv$ = this.cvService.selectedChartCv$
      .subscribe(
        (cv)=> {
          // show only charts by cv
          this.loadChartsByCV(cv);
        }
      )
  }

  private loadChartsIntoList(charts: Chart[]): void {
    this.charts = charts;
  }

  /**
   * Send a chart to edit and changes the tab
   * @param chart the chart to edit(comming from the DOM)
   */
  editChart(chart: Chart): void {
    // send chart to service
    this.chartService.sendChartToEdit(chart);
    // change tab
    this.chartService.selectTab('newChart');
  }

  onIsThresholdChange(chart: Chart): void {
    // update chart
    this.chartService.chartToDatabase(chart,true)
      .subscribe(
        (res) => {
          M.toast({
            html: 'Chart updated!'
          });
        },
        err => console.log(err)
      )
  }
}