import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { CV } from '../../models/cv';
import { Chart } from '../../models/chart';
import { ChartService } from '../../services/chart.service';
import { LayoutInformation } from '../../models/layoutInformation';

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

  originalCharts: Chart[] = [];

  ngOnInit() {
    this.subscribeToCV();
    this.subscribeToDeletedRow();
  }

  private subscribeToDeletedRow(): void {
    this.viewService.deletedRow$
      .subscribe(
        (deletedRow)=> {
          this.reloadChartList(deletedRow);
        }
      )
  }

  private reloadChartList(deletedRow: LayoutInformation): void {
    console.log(deletedRow);
    //this.charts = [];
    deletedRow.removed.forEach(
      (charts) => {
        charts.forEach(
          (chartId)=> {
            let c = this.originalCharts.filter(oc => oc.id == chartId)[0];
            this.charts.push(new Chart(c.id,c.name,c.cv,c.sampleType));
          }
        )
      }
    )
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
          charts.forEach(chart=>{
            this.charts.push(chart);
            this.originalCharts.push(chart);
          })
        }
      )
  }

}
