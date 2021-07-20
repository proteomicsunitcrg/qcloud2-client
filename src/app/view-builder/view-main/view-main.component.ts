import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { ChartService } from '../../services/chart.service';
import { CV } from '../../models/cv';
import { ModalService } from '../../common/modal.service';
import { DragulaService } from 'ng2-dragula';
import { BottomModal } from '../../models/bottomModal';
import { ModalResponse } from '../../models/modalResponse';
import { View } from '../../models/view';
import { ViewDisplay } from '../../models/viewDisplay';
import { Modal } from '../../models/modal';
import { Display } from '../../models/display';
import { delay } from 'q';
import { SampleTypeCategory } from '../../models/sampleTypeCategory';
import { SampleTypeCategoryService } from '../../services/sample-type-category.service';
import { Subscription } from 'rxjs';
import { SampleType } from '../../models/sampleType';
import { System } from '../../models/system';
import { UserChart } from '../../models/userChart';
import { UserView } from '../../models/userView';
import { SystemService } from '../../services/system.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, ERROR_MSG, ERROR_TITLE } from '../../shared/ToastConfig';
declare var M: any;

@Component({
  selector: 'app-view-main',
  templateUrl: './view-main.component.html',
  styleUrls: ['./view-main.component.css']
})

export class ViewMainComponent implements OnInit {
  constructor(private modalService: ModalService,
    private labSystemService: SystemService,
    private chartService: ChartService,
    private viewService: ViewService,
    private route: ActivatedRoute,
    private cvService: CvService,
    private sampleTypeCategoryService: SampleTypeCategoryService,
    private toastr: ToastrService) { }

  @Input() type: string;

  selectedBottomModalAction$: Subscription;

  view: View = new View(null, '', null, null, false, null, null);
  /**
   * Array for the list of charts
   */
  charts: UserChart[] = [];
  /**
   * Array for hold the original chart array
   */
  nodeCharts: UserChart[] = [];
  /**
   * Array for hold the ALL charts
   */
  AllCharts: UserChart[] = [];
  /**
   * display array is for build the
   * layout rows and columns
   */
  display = [];
  /**
   * chartDisplay array holds the information
   * about the chart, (id, row and col)
   */
  chartDisplay = [];

  loadedViewDisplay: any = null;


  /**
 * Holds the lab system on the users view builder
 */
  selectedLabSystem: System;

  /**
   * Holds the sample type on the users view builder
   */
  selectedSampleType: SampleType;

  viewDisplay: ViewDisplay[][] = [];

  cv: CV;

  selectedSampleTypeCategory: SampleTypeCategory;

  updating = false;

  ngOnInit() {
    this.subscribeToBottomModal();
    switch (this.type) {
      case 'user':
        this.loadAvailableChartsByNode();
        this.checkAndLoadUserView();
        break;
      case 'defaults':
        this.loadDefaultView();
        break;
      default:
        console.error('unknown type');
        break;
    }
  }
  // ********************* //
  // DEFAULT VIEWS METHODS //
  // ********************* //

  private loadDefaultView() {
    this.route.params.subscribe(
      params => {
        this.cvService.getCvByCvId(params['id']).subscribe(
          cv => {
            this.view.cv = cv;
            this.cv = cv;
            this.loadSampleTypeCategory(params['qc']);
            this.sendCVToList(cv, params['qc']);
            this.viewService.getDefaultViewNameByCVAndSampleTypeCategory(this.cv, params['qc']).subscribe(
              view => {
                if (view !== null) { // existing view, is updating
                  this.view = view;
                  this.updating = true;
                  this.viewService.getDefaultDisplayByView(view).subscribe(
                    viewDisplay => {
                      this.loadDisplayView(viewDisplay);
                      delay(1000).then(() => M.AutoInit());
                    },

                    errDisplay => {
                      this.toastr.error('Error getting the default view display', 'ERROR', TOASTSETTING);
                      console.error(errDisplay);
                    }
                  );
                }
              },
              errGetView => {
                this.toastr.error('Error getting the default view', 'ERROR', TOASTSETTING);
                console.error(errGetView);
              }
            );
          },
          errCV => {
            this.toastr.error('Error getting the URL params', 'ERROR', TOASTSETTING);
            console.error(errCV);
          }
        );
      }
    );
  }

  private saveDefaultView(): void {
    this.view.sampleTypeCategory = this.selectedSampleTypeCategory;
    this.viewService.addDefaultView(this.view)
      .subscribe(
        (view) => {
          this.prepareViewDisplayArray(view);
        },
        (error) => {
          this.toastr.error('Error saving the default view ', 'ERROR', TOASTSETTING);
          this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveDefaultView', null));
        }
      );
  }

  private saveDefaultViewDisplay(): void {
    this.viewService.addLayoutToDefaultView(this.viewDisplay)
      .subscribe(
        (display) => {
          this.toastr.error('Default view saved', 'Success', TOASTSETTING);
          // this.navigateBack('Chart saved!');
        },
        (error) => {
          this.toastr.error('Error updating the default view display', 'ERROR', TOASTSETTING);
          this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveViewDisplay', null));
        }
      );
  }

  private updateDefaultView(): void {
    this.viewService.updateDefaultView(this.view)
      .subscribe(
        (view) => {
          this.prepareViewDisplayArray(view);
        },
        (error) => {
          this.toastr.error('Error updating the default view ', 'ERROR', TOASTSETTING);
          this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveDefaultView', null));
        }
      );
  }

  private updateViewDisplay(): void {
    this.viewService.updateLayoutToDefaultView(this.viewDisplay, this.view.apiKey)
      .subscribe(
        (display) => {
          // this.navigateBack('Chart updated!');
          this.toastr.success('View updated', 'Success', TOASTSETTING);
        },
        (error) => {
          this.toastr.error('Error updating the view display', 'ERROR', TOASTSETTING);
          this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'updateViewDisplay', null));
        }
      );
  }

  // ****************** //
  // USER VIEWS METHODS //
  // ****************** //

  private addUserView(): any {
    this.view.isDefault = false;
    this.viewService.addUserView(this.view).subscribe(
      view => {
        this.prepareViewDisplayArray(view);
      },
      err => {
        console.error(err);
      }
    );
  }

  private updateUserView(): void {
    this.viewService.updateUserView(this.view)
      .subscribe(
        (view) => {
          this.prepareViewDisplayArray(view);
        },
        (error) => {
          this.toastr.error('Error saving the view', 'ERROR', TOASTSETTING);
          this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveDefaultView', null));
        }
      );
  }

  private checkAndLoadUserView() {
    this.route.params.subscribe(
      params => {
        if (params['apiKey'] !== undefined) {
          this.updating = true;
          this.viewService.getUserViewByApiKey(params['apiKey']).subscribe(
            view => {
              this.view = view;
              this.viewService.getUserDisplayByView(view).subscribe(
                display => {
                  this.loadDisplayView(display);
                  delay(2000).then(() => M.AutoInit());
                },
                error => {
                  this.toastr.error('Error getting the user view display', 'ERROR', TOASTSETTING);
                }
              );
            },
            error => {
              this.toastr.error('Error getting the user view', 'ERROR', TOASTSETTING);
            }
          );
        }
      }
    );
  }

  private saveUserViewDisplay(): void {
    this.viewService.addLayoutToUserView(this.viewDisplay)
      .subscribe(
        (display) => {
          this.viewService.sendNewUserViewToMenu();
          this.toastr.success('User view saved', 'Success', TOASTSETTING);
          // this.navigateBack('Chart saved!');
        },
        (error) => {
          this.toastr.error('Error saving the user view display', 'ERROR', TOASTSETTING);
          this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveViewDisplay', null));
        }
      );
  }

  // *************************************** //
  // GENERAL AND CHECKS AND FE VIEWS METHODS //
  // *************************************** //

  public buttonText(): string {
    if (this.type === 'defaults') {
      if (this.updating) {
        return 'Update default view';
      } else {
        return 'Create default view';
      }
    } else {
      if (this.updating) {
        return 'Update user view';
      } else {
        return 'Create user view';
      }
    }
  }

  addRow(): void {
    this.modalService.openBottomModal(new BottomModal('Add row', 'How many columns do you want', '1', '2', 'newRow', null));
  }

  deleteRow(row: number): void {
    // send information for reestruct the list
    this.display.splice(row, 1);
    this.chartDisplay.splice(row, 1);
  }

  private loadAvailableChartsByNode(): void {
    this.labSystemService.getSystems()
      .subscribe(
        (labSystems) => {
          labSystems.forEach(
            (ls) => {
              const mainCV = ls.dataSources.find(ds => ds.cv.category.mainDataSource === true);
              this.chartService.getChartsByCV(mainCV.cv)
                .subscribe(
                  (charts) => {
                    charts.forEach(c => {
                      const userChart = new UserChart(c.id,
                        ls.name + '-' + c.name,
                        c.cv,
                        c.sampleType,
                        c.isThresholdEnabled,
                        c.apiKey,
                        ls,
                        c.param);
                      this.nodeCharts.push(userChart);
                      this.charts.push(userChart);
                    });
                  }
                );
            });
        }
      );
    this.AllCharts = this.nodeCharts;
  }



  private addChartIntoDisplay(chartId, row, column): void {
    this.chartDisplay[row][column] = chartId;
  }

  private getChartName(id: any, lsApiKey: any): any {
    for (const chart of this.nodeCharts) {
      if (this.type === 'user') {
        if (chart.id === id && chart.labSystem.apiKey === lsApiKey) {
          return chart.name;
        }
      } else {
        if (chart.id === id) {
          return chart.name;
        }
      }
    }
  }

  private checkEmptyCells() { // TODO: arreglar aixo al nou model de dades
    console.log(this.chartDisplay);
    return true;
    if (this.chartDisplay === null || this.chartDisplay === undefined || this.chartDisplay.length === 0) {
      return false;
    }
    for (const row of this.chartDisplay) {
      if (row.length === 2) {
        if (row[0] == null || row[1] == null || isNaN(row[0]) || isNaN(row[1])) {
          return false;
        }
      } else {
        if (row[0] == null || isNaN(row[0])) {
          return false;
        }
      }
    }
    return true;
  }

  public getName(row, column): any {
    if (this.chartDisplay[row][column] === undefined) {
      return this.nodeCharts;
    } else {
      return this.AllCharts;
    }
  }

  private loadSampleTypeCategory(qcId: number): void {
    this.sampleTypeCategoryService.getSampleTypeCategoryById(qcId)
      .subscribe(
        (sampleTypeCategory) => {
          this.selectedSampleTypeCategory = sampleTypeCategory;
        }
      );
  }


  private prepareViewDisplayArray(view: View): any {
    this.chartDisplay.forEach(
      (row, index) => {
        this.viewDisplay[index] = [];
        row.forEach(
          (cell, colIndex) => {
            let chart: UserChart[];
            if (this.type === 'user') {
              chart = this.AllCharts.filter(c => c.id === Number(cell.chartId) && c.labSystem.apiKey === cell.lsApiKey);
            } else {
              chart = this.nodeCharts.filter(c => c.id === Number(cell.chartId));
            }
            if (this.type === 'user') {
              this.viewDisplay[index].push(new UserView(null, chart[0], view, index, colIndex, chart[0].labSystem));
            } else {
              this.viewDisplay[index].push(new ViewDisplay(null, chart[0], view, index, colIndex));
            }
          }
        );
      }
    );
    if (this.updating) {
      if (this.type === 'user') {
        this.saveUserViewDisplay();
      } else {
        this.updateViewDisplay();
      }
    } else { // new view
      if (this.type === 'user') {
        this.saveUserViewDisplay();
      } else {
        this.saveDefaultViewDisplay();
      }
    }
  }

  private sendCVToList(cv: CV, sampleTypeCategoryApiKey: string): void {
    // get the cv from server
    this.loadChartsByCVAndSampleTypeCategoryApiKey(cv, sampleTypeCategoryApiKey);
    // add to the view object
    this.view.cv = cv;
  }

  private loadChartsByCVAndSampleTypeCategoryApiKey(cv: CV, sampleTypeCategoryApiKey: string): void {
    this.charts = [];
    this.chartService.getChartsByCVAndSampleTypeCategoryApiKey(cv, sampleTypeCategoryApiKey)
      .subscribe(
        (charts) => {
          charts.forEach(c => {
            this.nodeCharts.push(new UserChart(c.id, c.name, c.cv, c.sampleType, c.isThresholdEnabled, c.apiKey, null, c.param));
          });

        }
      );
  }

  /**
 * We need to build the display as the view in the database
 * So, it will create the rows and columns with the layout
 * from the database.
 * @param viewDisplay The display from the database
 */
  private loadDisplayView(viewDisplay: Display): void {
    const charts = [];
    viewDisplay.charts.forEach(
      (row, index) => {
        this.display[index] = [];
        this.chartDisplay[index] = [];
        row.forEach(
          (col) => {
            this.display[index].push(null);
            if (col['chart'] === null) {
              this.chartDisplay[index].push(null);
            } else {
              if (this.type === 'user') {
                this.chartDisplay[index].push({ chartId: col['chart'].id, lsApiKey: col['labSystem'].apiKey });
              } else {
                this.chartDisplay[index].push({ chartId: col['chart'].id });
              }
              charts.push(col);
            }
          }
        );
      }
    );
    setTimeout(() => {  // The timeout is necessary because the select isnt instant
      this.chartDisplay.forEach(
        (row, indexRow) => {
          row.forEach(
            (chart, indexColumn) => {
              const select = <HTMLSelectElement>document.getElementById(`select${indexRow};${indexColumn}`);
              const newoption = new Option(this.getChartName(chart.chartId, chart.lsApiKey) + '(current)',
                `${chart.chartId};${chart.lsApiKey}`, null, true);
              select.add(newoption);
            });
        }
      );
      M.AutoInit();
    }, 3000);
    this.loadedViewDisplay = charts;
  }



  // *************** //
  // FILTERS METHODS //
  // *************** //

  public selectLabSystem(labSystem: System): void {
    this.selectedLabSystem = labSystem;
    this.filterCharts();
  }

  selectSampleType(sampleType: SampleType): void {
    this.selectedSampleType = sampleType;
    this.filterCharts();
  }

  private filterCharts(): void {
    if (this.selectedLabSystem === undefined && this.selectedSampleType !== undefined) {
      // only by sample type
      this.nodeCharts = this.AllCharts.filter(c => {
        return (c.sampleType.qualityControlControlledVocabulary === this.selectedSampleType.qualityControlControlledVocabulary || c.placed);
      });
    } else if (this.selectedLabSystem !== undefined && this.selectedSampleType === undefined) {
      // only by lab system
      this.nodeCharts = this.AllCharts.filter(c => {
        return (c.labSystem.apiKey === this.selectedLabSystem.apiKey || c.placed);
      });
    } else {
      // both criteria
      this.nodeCharts = this.AllCharts.filter(c => {
        // tslint:disable-next-line:max-line-length
        return ((c.labSystem.apiKey === this.selectedLabSystem.apiKey &&
          c.sampleType.qualityControlControlledVocabulary === this.selectedSampleType.qualityControlControlledVocabulary) || c.placed);
      });
    }
    delay(10).then(() => M.AutoInit());
  }


  // ************* //
  // EVENT METHODS //
  // ************* //

  public onChange(chartIdAndApiKey: string, row: string, column: string): void {
    const idAndKey = chartIdAndApiKey.split(';');
    const chartId = Number(idAndKey[0]);
    const lsApiKey = idAndKey[1];
    const objectinho = { 'chartId': chartId, 'lsApiKey': lsApiKey };
    this.addChartIntoDisplay(objectinho, row, column);
    for (const chart of this.nodeCharts) {
      if (chart.id === objectinho.chartId) {
        chart.placed = true;
        break;
      }
    }
  }

  private subscribeToBottomModal(): void {
    this.selectedBottomModalAction$ = this.modalService.selectedBottomModalAction$
      .subscribe(
        (action) => {
          this.doAction(action);
        }
      );
  }

  private doAction(action: ModalResponse): void {
    switch (action.modalAction) {
      case 'addColumn':
        this.display[this.display.length] = [];
        this.chartDisplay[this.chartDisplay.length] = [];
        for (let i = 0; i < Number(action.userAction); i++) {
          this.display[this.display.length - 1].push(null);
          this.chartDisplay[this.chartDisplay.length - 1].push(null);
        }
        setTimeout(() => {  // The timeout is necessary because the select isnt instant
          M.AutoInit();
        }, 100);
        break;
      default:
        console.error('error');
        break;
    }
  }

  public submitClick(): any {
    if (!this.checkEmptyCells()) {
      this.toastr.error('Empty cell detected', 'ERROR', TOASTSETTING);
      return;
    }
    if (this.updating) {
      if (this.type === 'user') { // UPDATE USER
        this.updateUserView();
      } else { // UPDATE DEFAULT
        this.view.isDefault = true;
        this.updateDefaultView();
      }
    } else {
      if (this.type === 'user') { // NEW USER
        this.addUserView();
      } else {  // NEW DEFAULT
        this.view.isDefault = true;
        this.saveDefaultView();
      }
    }
  }
}
