import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewService } from '../../../services/view.service';
import { Display } from '../../../models/display';
import { View } from '../../../models/view';
import { ViewDisplay } from '../../../models/viewDisplay';
import { DataSourceService } from '../../../services/data-source.service';
import { DataSource } from '../../../models/dataSource';
import { CV } from '../../../models/cv';
import { FileService } from '../../../services/file.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { System } from '../../../models/system';
import { SystemService } from '../../../services/system.service';
import { Category } from '../../../models/category';
import { delay } from 'q';
import { Subscription } from 'rxjs/Subscription';
declare var M: any;

@Component({
  selector: 'app-data-visualization-display',
  templateUrl: './data-visualization-display.component.html',
  styleUrls: ['./data-visualization-display.component.css']
})
export class DataVisualizationDisplayComponent implements OnInit, OnDestroy {

  constructor(private viewService: ViewService,
    private dataSourceService: DataSourceService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private router: Router,
    private systemService: SystemService) { }

  display: Display = new Display(null);

  displays: Display[] = [];

  dataSource: DataSource;

  system: System;

  type: string;

  views: View[] = [];

  count = 0;

  viewLoaded: Promise<boolean>[] = [];

  loadedViews: number[] = [];

  selectedDataSourceForDisplay$: Subscription;

  ngOnInit() {
    this.subscribeToDataSourceForDisplay();
    this.subscribeToRoute();
  }
  ngOnDestroy() {
    this.selectedDataSourceForDisplay$.unsubscribe();
  }

  private subscribeToRoute(): void {
    this.route.params.subscribe(
      (params) => {
        this.loadView(params.type, params.apiKey);
      }
    );
  }
  private loadView(type: string, systemApiKey: string): void {
    switch (type) {
      case 'instrument':
        // load defaults
        // this.dataSourceService.getDataSourceByApikey(dataSourceApikey)
        // get master cv of that system
        this.systemService.getSystemByApikey(systemApiKey)
          .subscribe(
            (res) => {
              this.system = res;
              res.dataSources.forEach(
                (ds) => {
                  if (ds.cv.category.mainDataSource === true) {
                    // get views by cv id
                    this.viewService.getDefaultViewsByCVId(ds.cv.cvid)
                      .subscribe(
                        (views) => {
                          this.views = views;
                          this.loadInitialView();
                          delay(100).then(
                            () => {
                              this.enableTabs();
                            }
                          );
                        });
                  }
                });
            });
        break;
      case 'view':
        // load view

        break;
      default:
        console.log('invalid option');
        break;
    }
  }

  private loadInitialView(): void {
    this.loadDefaultChartsByView(this.views[0]);
  }


  private enableTabs(): void {
    const elem = document.getElementById('chartstabs');
    const instance = M.Tabs.init(elem);
  }

  /**
   * This subscription is for the default view
   * of the instruments
   */
  private subscribeToDataSourceForDisplay(): void {
    this.selectedDataSourceForDisplay$ = this.dataSourceService.selectedDataSourceForDisplay$
      .subscribe(
        (dataSource) => {
          this.dataSource = dataSource;
        }
      );
  }

  private loadDefaultChartsByView(view: View): void {
    this.viewService.getDefaultDisplayByView(view)
      .subscribe(
        (res) => {
          // this.display = res;
          this.displays['a' + view.id] = res;
        }, err => console.log(err), () => {
          this.count++;
          this.viewLoaded[view.id] = Promise.resolve(true);
          this.loadedViews.push(view.id);
        }
      );
  }
  /**
   * Load the content of a sample type category if
   * it has not been loaded yet
   * @param view
   */
  loadTab(view: View): void {
    if (this.loadedViews.find(viewId => viewId === view.id) === undefined) {
      this.loadDefaultChartsByView(view);
    }
  }
}
