import { Component, OnInit, Input } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { ChartService } from '../../../services/chart.service';
import { CV } from '../../../models/cv';
import { Chart } from '../../../models/chart';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartParamsService } from '../../../services/chart-params.service';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit {

  @Input() chartId: number;
  charts: Chart[];

  constructor(private cvService: CvService,
    private chartService: ChartService,
    private chartParamsService: ChartParamsService) { }

  ngOnInit() {
    this.loadAllCharts();
    this.subscribeToCVChange();
    this.subscribeToReset();
  }

  private subscribeToReset(): void {
    this.chartParamsService.resetComponent$
      .subscribe(
        () => {
          this.loadAllCharts();
        }
      )
  }

  private loadAllCharts(): void {
    this.chartService.getAllCharts()
      .subscribe(
        (charts) => {
          this.loadChartsIntoList(charts);
        }
      )
  }
  private loadChartsByCV(cv: CV): void {
    this.chartService.getChartsByCV(cv)
      .subscribe(
        (charts) => {
          this.loadChartsIntoList(charts);
        }
      )
  }

  private subscribeToCVChange(): void {
    this.cvService.selectedChartCv$
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

  editChart(chart: Chart): void {
    // send chart to service
    this.chartService.sendChartToEdit(chart);

    // change tab
    this.chartService.selectTab('newChart');
  }


}