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
// export class ViewMainComponent implements OnInit, OnDestroy {

//   constructor(private viewService: ViewService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private cvService: CvService,
//     private chartService: ChartService,
//     private modalService: ModalService,
//     private dragulaService: DragulaService,
//     private sampleTypeCategoryService: SampleTypeCategoryService,
//     private labSystemService: SystemService,
//     private toastr: ToastrService) { }

//   @Input() type: string;

//   submitButtonText: string;

//   selectedSampleTypeCategory: SampleTypeCategory;

//   loadedViewDisplay: any = null;

// /**
//  * Holds the sample type on the users view builder
//  */
// selectedSampleType: SampleType;

//   /**
//    * Holds the lab system on the users view builder
//    */
//   selectedLabSystem: System;

//   /**
//    * display array is for build the
//    * layout rows and columns
//    */
//   display = [];
//   /**
//    * chartDisplay array holds the information
//    * about the chart, (id, row and col)
//    */
//   chartDisplay = [];

// /**
//  * Array for the list of charts
//  */
// charts: UserChart[] = [];
// /**
//  * Array for hold the original chart array
//  */
// nodeCharts: UserChart[] = [];
//   cv: CV;

//   viewDisplay: ViewDisplay[][] = [];

//   view: View = new View(null, '', null, null, true, null, null);

//   selectedBottomModalAction$: Subscription;
//   selectedAction$: Subscription;



//   ngOnInit() {
//     this.subscribeToBottomModal();
//     this.subscribeToModal();
//     this.dragulaService.drop.subscribe((value) => {
//       this.onDrop(value.slice(1));
//     });
//     this.dragulaService.drag.subscribe((value) => {
//       this.onDrag(value.slice(1));
//     });
//     this.dragulaService.setOptions('first-bag', { revertOnSpill: true, copy: false });

//     if (this.type === 'defaults') {
//       // load charts by cv and send to the list
//       this.route.params.subscribe(
//         (params) => {
//           // Get and set the CV
//           this.cvService.getCvByCvId(params['id'])
//             .subscribe(
//               (cv) => {
//                 this.view.cv = cv;
//                 this.cv = cv;
//                 this.loadSampleTypeCategory(params['qc']);
//                 this.sendCVToList(cv, params['qc']);
//                 this.viewService.getDefaultViewNameByCVAndSampleTypeCategory(this.cv, params['qc'])
//                   .subscribe(
//                     (view) => {
//                       if (view !== null) {
//                         // existing view, organize the charts in the display
//                         this.submitButtonText = 'Update';
//                         this.view = view;
//                         // get the view display
//                         this.viewService.getDefaultDisplayByView(view)
//                           .subscribe(
//                             (viewDisplay) => {
//                               this.loadDefaultDisplayView(viewDisplay);
//                               delay(1).then(() => this.getElementByChartId());

//                             }
//                           );
//                       } else {
//                         // new default view
//                         this.submitButtonText = 'Save';
//                       }
//                     }, (error) => {
//                       console.log(error);
//                     });
//               },
//               (error) => {
//                 console.log(error);
//               }
//             );
//         }
//       );
//     } else {
//       this.loadAvailableChartsByNode();
//       this.submitButtonText = 'Save';
//       this.route.params.subscribe(
//         (params) => {
//           if (params['apiKey'] !== undefined) {
//             this.viewService.getUserViewByApiKey(params['apiKey'])
//               .subscribe(
//                 (view) => {
//                   if (view !== null) {
//                     this.submitButtonText = 'Update';
//                     this.view = view;
//                     // get the view display
//                     this.viewService.getUserDisplayByView(view)
//                       .subscribe(
//                         (viewDisplay) => {
//                           this.loadDefaultDisplayView(viewDisplay);
//                           delay(1000).then(() => this.getElementByChartId());
//                         }
//                       );
//                   } else {
//                     console.log('mal');
//                   }
//                 }
//               );
//           }
//         });
//     }
//   }

//   private loadSampleTypeCategory(qcId: number): void {
//     this.sampleTypeCategoryService.getSampleTypeCategoryById(qcId)
//       .subscribe(
//         (sampleTypeCategory) => {
//           this.selectedSampleTypeCategory = sampleTypeCategory;
//         }
//       );
//   }

//   /**
//    * We need to build the display as the view in the database
//    * So, it will create the rows and columns with the layout
//    * from the database.
//    * @param viewDisplay The display from the database
//    */
//   private loadDefaultDisplayView(viewDisplay: Display): void {
//     const charts = [];
//     viewDisplay.charts.forEach(
//       (row, index) => {
//         this.display[index] = [];
//         this.chartDisplay[index] = [];
//         row.forEach(
//           (col) => {
//             this.display[index].push(null);
//             if (col['chart'] === null) {
//               this.chartDisplay[index].push(null);
//             } else {
//               this.chartDisplay[index].push(col['chart'].id);
//               charts.push(col);
//             }
//           }
//         );
//       }
//     );
//     this.loadedViewDisplay = charts;
//   }

//   private getElementByChartId(): void {
//     this.loadedViewDisplay.forEach(
//       (chart) => {
//         // get chart from list
//         const listedChart = document.getElementById('plotId-' + chart.chart.id);
//         // append to its corresponding spot
//         const slot = document.getElementById(chart.row + ';' + chart.col);
//         slot.appendChild(listedChart);
//         this.setPlacedChart(chart.chart.id, true);

//       }
//     );
//   }

//   private setPlacedChart(chartId: number, placed: boolean): void {
//     if (this.type !== 'defaults') {
//       const chart = this.nodeCharts.find(
//         (c) => {
//           return c.id === Number(chartId);
//         }
//       );
//       chart.placed = placed;
//     }
//   }

//   onSubmit(): void {
//     // Before insert check the layout
//     const viewName = this.view.name;
//     let formOk = true;
//     this.view.sampleTypeCategory = this.selectedSampleTypeCategory;
//     if (this.chartDisplay.length === 0) {
//       // show modal
//       this.modalService.openModal(new Modal('Error', 'You need at least one column', 'Ok', null, 'noRows', viewName));
//       formOk = false;
//     }

//     if (formOk) {
//       if (this.submitButtonText === 'Save') {
//         this.saveDefaultView();
//       } else {
//         this.updateDefaultView();
//       }
//     }
//   }

// private updateDefaultView(): void {
//   this.viewService.updateDefaultView(this.view)
//     .subscribe(
//       (view) => {
//         this.prepareViewDisplayArray(view);
//       },
//       (error) => {
//         this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveDefaultView', null));
//       }
//     );
// }

// private saveDefaultView(): void {
//   this.viewService.addDefaultView(this.view)
//     .subscribe(
//       (view) => {
//         this.prepareViewDisplayArray(view);
//       },
//       (error) => {
//         this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveDefaultView', null));
//       }
//     );
// }

//   private prepareViewDisplayArray(view: View): any {
//     try {
//       this.chartDisplay.forEach(
//         (row, index) => {
//           this.viewDisplay[index] = [];
//           row.forEach(
//             (cell, colIndex) => {
//               const chart = this.charts.filter(c => c.id === Number(cell));
//               if (this.type === 'defaults') {
//                 this.viewDisplay[index].push(new ViewDisplay(null, chart[0], view, index, colIndex));
//               } else {
//                 this.viewDisplay[index].push(new UserView(null, chart[0], view, index, colIndex, chart[0].labSystem));
//               }
//             }
//           );
//         }
//       );
//       if (this.submitButtonText === 'Save') {
//         if (this.type === 'defaults') {
//           this.saveDefaultViewDisplay();
//         } else {
//           this.saveUserViewDisplay();
//         }
//       } else {
//         if (this.type === 'defaults') {
//           this.updateViewDisplay();
//         } else {
//           this.updateUserViewDisplay();
//         }
//       }
//     } catch (error) {
//       this.viewService.deleteView(view).subscribe(
//         res => {
//           this.toastr.error('You must use all columns', 'Error', TOASTSETTING);
//         },
//         err => {
//           console.error(err);
//         }
//       )
//     }

//   }

//   private updateUserViewDisplay(): void {
//     this.viewService.updateLayoutToUserView(this.viewDisplay, this.view.apiKey)
//       .subscribe(
//         (display) => {
//           this.navigateBack('Chart updated!');
//         },
//         (error) => {
//           this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'updateViewDisplay', null));
//         }
//       );
//   }

//   private updateViewDisplay(): void {
//     this.viewService.updateLayoutToDefaultView(this.viewDisplay, this.view.apiKey)
//       .subscribe(
//         (display) => {
//           this.navigateBack('Chart updated!');
//         },
//         (error) => {
//           this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'updateViewDisplay', null));
//         }
//       );
//   }

//   private saveDefaultViewDisplay(): void {
//     this.viewService.addLayoutToDefaultView(this.viewDisplay)
//       .subscribe(
//         (display) => {
//           this.navigateBack('Chart saved!');
//         },
//         (error) => {
//           this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveViewDisplay', null));
//         }
//       );
//   }

//   private saveUserViewDisplay(): void {    
//     this.viewService.addLayoutToUserView(this.viewDisplay)
//       .subscribe(
//         (display) => {
//           this.viewService.sendNewUserViewToMenu();
//           this.navigateBack('Chart saved!');
//         },
//         (error) => {
//           this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveViewDisplay', null));
//         }
//       );
//   }

//   private navigateBack(action: string): void {
//     this.toastr.success(action, null, TOASTSETTING);
//     if (this.type === 'defaults') {
//       this.router.navigate(['/application/administration/views']);
//     } else {
//       this.router.navigate(['/application/configuration/views']);
//     }
//   }

//   private loadChartsByCVAndSampleTypeCategoryApiKey(cv: CV, sampleTypeCategoryApiKey: string): void {
//     this.charts = [];
//     this.chartService.getChartsByCVAndSampleTypeCategoryApiKey(cv, sampleTypeCategoryApiKey)
//       .subscribe(
//         (charts) => {
//           charts.forEach(c => {
//             this.charts.push(new UserChart(c.id, c.name, c.cv, c.sampleType, c.isThresholdEnabled, c.apiKey, null, c.param));
//           });
//         }
//       );
//   }


//   private sendCVToList(cv: CV, sampleTypeCategoryApiKey: string): void {
//     // get the cv from server
//     this.loadChartsByCVAndSampleTypeCategoryApiKey(cv, sampleTypeCategoryApiKey);

//     // add to the view object
//     this.view.cv = cv;
//   }

//   private onDrop(args) {
//     const [e, el] = args;
//     const plotId = e.getElementsByClassName('plotId')[0].innerHTML;
//     const id = el.getAttribute('id');
//     let adding = true;
//     /**
//      * It will have an id if it is placed
//      * in the layout section. This is a way to
//      * know where the item is.
//      */

//     if (id !== null) {
//       // adding
//       adding = true;
//     } else {
//       // removing
//       adding = false;
//     }
//     const currentElements = el.childElementCount;

//     /**
//      * If the user tries to add an item in a
//      * bag having a previous item it will cancel
//      * the drag.
//      * It have a boolean condition for ensure that
//      * differenciate the chart pool of the layout
//      */
//     if (currentElements > 1 && adding && el.getAttribute('id') !== 'charts-list') {
//       this.dragulaService.find('first-bag').drake.cancel(true);
//       console.log('fullll');

//     } else {
//       if (adding) {
//         console.log(el.getAttribute('id'));

//         if (el.getAttribute('id') !== 'charts-list') {
//           // delete from previous position if it was any
//           const position = id.split(';');
//           this.addChartIntoDisplay(plotId, position);
//           this.setPlacedChart(plotId, true);
//         } else {
//           // remove
//           console.log('seterino');

//           this.setPlacedChart(plotId, false);
//         }

//       } else {
//         console.log('cancelerino');

//         this.dragulaService.find('first-bag').drake.cancel(true);
//       }
//     }
//   }

//   private addChartIntoDisplay(plotId: number, position: number[]): void {
//     this.chartDisplay[position[0]][position[1]] = plotId;
//   }

//   private onDrag(args) {
//     const [e, el] = args;
//   }

//   private subscribeToBottomModal(): void {
//     this.selectedBottomModalAction$ = this.modalService.selectedBottomModalAction$
//       .subscribe(
//         (action) => {
//           this.doAction(action);
//         }
//       );
//   }

//   private subscribeToModal(): void {
//     this.selectedAction$ = this.modalService.selectedAction$
//       .subscribe(
//         (action) => {
//           this.doAction(action);
//         }
//       );
//   }

// private doAction(action: ModalResponse): void {
//   switch (action.modalAction) {
//     case 'addColumn':
//       this.display[this.display.length] = [];
//       this.chartDisplay[this.chartDisplay.length] = [];
//       for (let i = 0; i < Number(action.userAction); i++) {
//         this.display[this.display.length - 1].push(null);
//         this.chartDisplay[this.chartDisplay.length - 1].push(null);
//       }
//       break;
//     case 'noRows': {
//       this.view.name = action.objectInstance;
//       break;
//     }
//     default:
//       console.log('error');
//       break;
//   }
// }

//   deleteRow(row: number): void {
//     // send information for reestruct the list
//     this.chartDisplay[row].forEach(
//       (charts, index) => {
//         if (charts !== null) {
//           const elem = document.getElementById(row + ';' + index);
//           const list = document.getElementById('charts-list');
//           list.appendChild(elem.firstElementChild);
//         }
//       }
//     );
//     this.display.splice(row, 1);
//     this.chartDisplay.splice(row, 1);
//   }

//   addRow(): void {
//     this.modalService.openBottomModal(new BottomModal('Add row', 'How many columns do you want', '1', '2', 'newRow', null));
//   }

//   ngOnDestroy(): void {
//     this.dragulaService.destroy('first-bag');
//     this.selectedAction$.unsubscribe();
//     this.selectedBottomModalAction$.unsubscribe();
//   }

  // selectSampleType(sampleType: SampleType): void {
  //   this.selectedSampleType = sampleType;
  //   this.filterCharts();

  // }

//   selectLabSystem(labSystem: System): void {
//     this.selectedLabSystem = labSystem;
//     this.filterCharts();
//   }

//   private filterCharts(): void {
//     if (this.selectedLabSystem === undefined && this.selectedSampleType !== undefined) {
//       // only by sample type
//       this.charts = this.nodeCharts.filter(c => {
//         return (c.sampleType.qualityControlControlledVocabulary === this.selectedSampleType.qualityControlControlledVocabulary || c.placed);
//       });
//     } else if (this.selectedLabSystem !== undefined && this.selectedSampleType === undefined) {
//       // only by lab system
//       this.charts = this.nodeCharts.filter(c => {
//         return (c.labSystem.apiKey === this.selectedLabSystem.apiKey || c.placed);
//       });
//     } else {
//       // both criteria
//       this.charts = this.nodeCharts.filter(c => {
//         // tslint:disable-next-line:max-line-length
//         return ((c.labSystem.apiKey === this.selectedLabSystem.apiKey &&
//           c.sampleType.qualityControlControlledVocabulary === this.selectedSampleType.qualityControlControlledVocabulary) || c.placed);
//       });
//     }
//     delay(10).then(() => this.correctDragula());
//   }

//   /**
//    * Dragula is not working fine... it places charts when the filter
//    * ends in the layout instead of placing it in the list.
//    * This is not a good solution.
//    */
//   private correctDragula(): void {
//     // look for charts out of its place
//     const ids = [];
//     this.chartDisplay.forEach(
//       (row) => {
//         row.forEach(
//           (col) => {
//             ids.push(col);
//           }
//         );
//       }
//     );
//     [].forEach.call(
//       document.querySelectorAll('.layout > .avatar'),
//       function (el) {
//         const plotId: string = el.getAttribute('id');
//         const chartId: string = plotId.replace('plotId-', '');
//         if (!ids.find(id => Number(id) === Number(chartId))) {
//           // move to the correct box
//           const elem = document.getElementById(plotId);
//           const list = document.getElementById('charts-list');
//           list.appendChild(elem);
//         }
//       }
//     );
//   }

//   private loadAvailableChartsByNode(): void {
//     this.labSystemService.getSystems()
//       .subscribe(
//         (labSystems) => {
//           labSystems.forEach(
//             (ls) => {
//               const mainCV = ls.dataSources.find(ds => ds.cv.category.mainDataSource === true);
//               this.chartService.getChartsByCV(mainCV.cv)
//                 .subscribe(
//                   (charts) => {
//                     charts.forEach(c => {
//                       const userChart = new UserChart(c.id,
//                         ls.name + '-' + c.name,
//                         c.cv,
//                         c.sampleType,
//                         c.isThresholdEnabled,
//                         c.apiKey,
//                         ls,
//                         c.param);
//                       this.nodeCharts.push(userChart);
//                       this.charts.push(userChart);
//                     });
//                   }
//                   );
//             }
//           );
//         }
//       );
//   }

//   onSubmitUser(): void {
//     // Before insert check the layout
//     const viewName = this.view.name;
//     let formOk = true;

//     if (this.chartDisplay.length === 0) {
//       // show modal
//       this.modalService.openModal(new Modal('Error', 'You need at least one column', 'Ok', null, 'noRows', viewName));
//       formOk = false;
//     }

//     if (formOk) {
//       if (this.submitButtonText === 'Save') {
//         this.saveUserView();
//       } else {
//         this.updateUserView();
//       }
//     }
//   }

//   private saveUserView(): void {
//     this.viewService.addUserView(this.view)
//       .subscribe(
//         (view) => {
//           this.prepareViewDisplayArray(view);
//         },
//         (error) => {
//           this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveDefaultView', null));
//         }
//       );
//   }
//   private updateUserView(): void {
//     this.viewService.updateUserView(this.view)
//       .subscribe(
//         (view) => {
//           this.prepareViewDisplayArray(view);
//         },
//         (error) => {
//           this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'saveDefaultView', null));
//         }
//       );
//   }

// }

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
            this.cv = cv
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
                      console.error(errDisplay)
                    }
                  );
                }
              },
              errGetView => {
                this.toastr.error('Error getting the default view', 'ERROR', TOASTSETTING);
                console.error(errGetView)
              }
            );
          },
          errCV => {
            this.toastr.error('Error getting the URL params', 'ERROR', TOASTSETTING);
            console.error(errCV)
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
        if (params['apiKey'] != undefined) {
          this.updating = true;
          this.viewService.getUserViewByApiKey(params['apiKey']).subscribe(
            view => {
              this.view = view;
              this.viewService.getUserDisplayByView(view).subscribe(
                display => {
                  this.loadDisplayView(display)
                  delay(1000).then(() => M.AutoInit());
                },
                error => {
                  this.toastr.error('Error getting the user view display', 'ERROR', TOASTSETTING);
                }
              )
            },
            error => {
              this.toastr.error('Error getting the user view', 'ERROR', TOASTSETTING);
            }
          )
        }
      }
    )
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
        return 'Update default view'
      } else {
        return 'Create default view';
      }
    } else {
      if (this.updating) {
        return 'Update user view'
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

  private getChartName(id: any): any {
    for (let chart of this.nodeCharts) {
      if (chart.id == id) {
        return chart.name;
      }
    }
  }

  private checkEmptyCells() {
    if (this.chartDisplay == null || this.chartDisplay == undefined || this.chartDisplay.length == 0) {
      return false;
    }
    for (const row of this.chartDisplay) {
      if (row.length == 2) {
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
    if (this.chartDisplay[row][column] == undefined) {
      return this.nodeCharts
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
            if (this.type == 'user') {
              chart = this.AllCharts.filter(c => c.id === Number(cell));
            } else {
              chart = this.nodeCharts.filter(c => c.id === Number(cell));
            }
            console.log(chart, index, view, colIndex);
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
              this.chartDisplay[index].push(col['chart'].id);
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
            (chartId, indexColumn) => {
              let select = <HTMLSelectElement>document.getElementById(`select${indexRow};${indexColumn}`);
              const newoption = new Option(this.getChartName(chartId) + '(current)', chartId, null, true);
              select.add(newoption);
            });
        }
      )
      M.AutoInit();
    }, 1000);
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

  public onChange(chartId, row, column): void {
    this.addChartIntoDisplay(Number(chartId), row, column);
    for (let chart of this.nodeCharts) {
      if (chart.id == chartId) {
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
