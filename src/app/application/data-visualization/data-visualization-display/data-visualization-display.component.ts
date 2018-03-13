import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../services/view.service';
import { Display } from '../../../models/display';
import { View } from '../../../models/view';
import { DataSourceService } from '../../../services/data-source.service';
import { DataSource } from '../../../models/dataSource';
import { CV } from '../../../models/cv';

@Component({
  selector: 'app-data-visualization-display',
  templateUrl: './data-visualization-display.component.html',
  styleUrls: ['./data-visualization-display.component.css']
})
export class DataVisualizationDisplayComponent implements OnInit {

  constructor(private viewService: ViewService,
    private dataSourceService: DataSourceService) { }

  display: Display = new Display(null);

  view: View = new View(null, null, null);

  ngOnInit() {
    this.subscribeToDataSourceForDisplay();
  }

  private subscribeToDataSourceForDisplay(): void {
    this.dataSourceService.selectedDataSourceForDisplay$
      .subscribe(
        (dataSource) => {
          this.getDefaultViewNameByCV(dataSource.cv);
          this.loadDefaultChartsByCV(dataSource.cv);
        }
      )
  }
  private loadDefaultChartsByCV(cv: CV): void {
    this.viewService.getDefaultByCV(cv)
      .subscribe(
        (res) => {
          this.display = res;
        }
      )
  }



  private getDefaultViewNameByCV(cv: CV): void {
    this.viewService.getDefaultViewNameByCV(cv)
      .subscribe(res => this.view = res)
  }

  calculate(): void {
    this.display.charts.forEach(
      (line) => {
        console.log(line.length);
      }
    )
  }

}
