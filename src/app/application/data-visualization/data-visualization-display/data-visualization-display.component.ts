import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../../services/view.service';
import { Display } from '../../../models/display';
import { View } from '../../../models/view';
import { DataSourceService } from '../../../services/data-source.service';
import { DataSource } from '../../../models/dataSource';
import { CV } from '../../../models/cv';
import { FileService } from '../../../services/file.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-data-visualization-display',
  templateUrl: './data-visualization-display.component.html',
  styleUrls: ['./data-visualization-display.component.css']
})
export class DataVisualizationDisplayComponent implements OnInit {

  constructor(private viewService: ViewService,
    private dataSourceService: DataSourceService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private router: Router) { }

  display: Display = new Display(null);

  view: View = new View(null, null, null);

  dataSource: DataSource;

  type: string;
  


  ngOnInit() {
    this.subscribeToDataSourceForDisplay();    
    this.subscribeToRoute();
  }

  private subscribeToRoute(): void {
    this.route.params.subscribe(
      (params) => {
        this.loadView(params.type,params.id);
      }
    )
  }
  private loadView(type: string, dataSourceApikey: string): void {
    switch(type) {
      case 'instrument':
        //load defaults
        this.dataSourceService.getDataSourceByApikey(dataSourceApikey)
          .subscribe(
            (dataSource) => {
              this.dataSource = dataSource;
              this.loadDefaultChartsByCV(dataSource.cv);
              this.getDefaultViewNameByCV(dataSource.cv);
            }
          )
        break;
      case 'view':
        //load view

        break;
      default:
        console.log('invalid option');
        break;
    }
  }

  /**
   * This subscription is for the default view
   * of the instruments
   */
  private subscribeToDataSourceForDisplay(): void {
    this.dataSourceService.selectedDataSourceForDisplay$
      .subscribe(
        (dataSource) => {
          this.getDefaultViewNameByCV(dataSource.cv);
          this.loadDefaultChartsByCV(dataSource.cv);
          this.dataSource = dataSource;
        }
      )
  }
  private loadDefaultChartsByCV(cv: CV): void {
    this.viewService.getDefaultByCV(cv)
      .subscribe(
        (res) => {          
          this.display = res;
          console.log(this.display);
        }
      )
  }
  /**
   * This functions gets the name of the current
   * default view selected by CV
   * @param cv the CV for this current view
   */
  private getDefaultViewNameByCV(cv: CV): void {
    this.viewService.getDefaultViewNameByCV(cv)
      .subscribe(res => this.view = res)
  }


}
