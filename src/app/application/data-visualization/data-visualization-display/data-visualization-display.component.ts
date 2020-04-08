import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ViewService } from '../../../services/view.service';
import { Display } from '../../../models/display';
import { View } from '../../../models/view';
import { DataSourceService } from '../../../services/data-source.service';
import { DataSource } from '../../../models/dataSource';
import { ActivatedRoute } from '@angular/router';
import { System } from '../../../models/system';
import { SystemService } from '../../../services/system.service';
import { delay } from 'q';
import { Subscription } from 'rxjs';
import { LabSystemStatus } from '../../../models/labsystemstatus';
import { MessageService } from '../../../services/message.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, NOTI_MSG, NOTI_TITLE } from '../../../shared/ToastConfig';

declare var M: any;

@Component({
  selector: 'app-data-visualization-display',
  templateUrl: './data-visualization-display.component.html',
  styleUrls: ['./data-visualization-display.component.css']
})
export class DataVisualizationDisplayComponent implements OnInit, OnDestroy {

  constructor(private viewService: ViewService,
    private dataSourceService: DataSourceService,
    private route: ActivatedRoute,
    private systemService: SystemService,
    private messageService: MessageService,
    private toastr: ToastrService) {

  }

  display: Display = new Display(null);

  displays: Display[] = [];

  dataSource: DataSource;

  system: System = null;

  type: string;

  views: View[] = [];

  count = 0;

  viewLoaded: Promise<boolean>[] = [];

  loadedViews: number[] = [];

  selectedDataSourceForDisplay$: Subscription;

  labSystemStatusFromUrl: LabSystemStatus = null;

  ngOnInit() {
    this.subscribeToDataSourceForDisplay();
    this.subscribeToRoute();
    this.checkNotification();
  }
  ngOnDestroy() {
    this.selectedDataSourceForDisplay$.unsubscribe();
  }
  ngAfterViewInit() {
    // const indic = document.querySelector(".indicator");
    // indic[0].style.backgroundColor = "blue"
  }

  private subscribeToRoute(): void {
    this.route.params.subscribe(
      (params) => {
        this.type = params.type;
        this.loadView(params.type, params.apiKey);
        if (params['alertData'] !== undefined) {
          this.labSystemStatusFromUrl = JSON.parse(atob(params['alertData']));
        } else {
          this.labSystemStatusFromUrl = new LabSystemStatus(null, null, null, null, null, null, null);
        }
      }
    );
  }
  private loadView(type: string, systemApiKey: string): void {
    switch (type) {
      case 'instrument':
        // load defaults
        // get master cv of that system
        this.systemService.getSystemByApikey(systemApiKey)
          .subscribe(
            (res) => {
              this.system = res;
              res.dataSources.forEach(
                (ds) => {
                  if (ds.cv.category.mainDataSource === true) {
                    // get views by cv id
                    this.viewService.getDefaultViewsByCVIdAndLsApiKey(ds.cv.cvid, this.system.apiKey)
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
      case 'user':
        // load view
        this.viewService.getUserViewByApiKey(systemApiKey)
          .subscribe(
            (view) => {
              this.viewService.getUserDisplayByView(view)
                .subscribe(
                  (userDisplay) => {
                    this.display = userDisplay;
                  }, err => console.log(err)
                );
            });


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

  private checkNotification() {
    this.messageService.showNotification().subscribe(
      res => {
        if (res) {
          this.toastr.info(NOTI_MSG, NOTI_TITLE, TOASTSETTING);
        }
      },
      err => console.error(err)
    );
  }
}
