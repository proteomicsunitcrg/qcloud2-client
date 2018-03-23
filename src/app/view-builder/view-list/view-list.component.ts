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
        (deletedRow) => {
          this.reloadChartList(deletedRow);
        }
      )
  }

  private reloadChartList(deletedRow: LayoutInformation): void {    
    //this.charts = [];
    deletedRow.removed.forEach(
      (charts) => {
        charts.forEach(
          (chartId) => {
            this.removeChartFromArray(chartId);            
            let c = this.originalCharts.filter(oc => oc.id == chartId)[0];
            this.charts.push(new Chart(c.id, c.name, c.cv, c.sampleType));
          })
      });
      this.duplicateAndReasignChartArray();
  }

  private duplicateAndReasignChartArray(): void{
    let newArray: Chart[] = [];
    this.charts.forEach(
      (chart) => {
        newArray.push(chart);
      }
    );
    this.charts.length = 0;
    this.charts = newArray;    
  }


  private removeChartFromArray(chartId): void {
    for (let i = 0; i < this.charts.length; i++) {
      if (this.charts[i].id == chartId) {
        this.charts.splice(i, 1);
        break;
      }
    }
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
        (charts) => {
          charts.forEach(c => {
            this.charts.push(new Chart(c.id, c.name, c.cv, c.sampleType));
            this.originalCharts.push(new Chart(c.id, c.name, c.cv, c.sampleType));
          });
        }
      )
      
  }

}
