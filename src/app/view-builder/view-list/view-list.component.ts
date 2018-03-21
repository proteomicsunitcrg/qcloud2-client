import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { CV } from '../../models/cv';
import { Chart } from '../../models/chart';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {

  constructor(private viewService: ViewService,
    private chartService: ChartService) { }

  cv: CV;

  charts: Chart[] = [];

  ngOnInit() {
    this.subscribeToCV();
  }

  /**
   * This will get data in case the user is trying
   * to generate a default view for a CV
   */
  private subscribeToCV(): void {
    this.viewService.selectedCV$
      .subscribe(
        (cv) => {
          this.cv = cv;
          this.loadChartsByCV(cv);
        }
      )
  }

  private loadChartsByCV(cv: CV): void {
    this.charts = [];
    this.chartService.getChartsByCV(cv)
      .subscribe(
        (charts)=> {
          charts.forEach(chart=> this.charts.push(chart))
        }
      )

  }

}
