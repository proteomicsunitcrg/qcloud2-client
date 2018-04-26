import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { ChartService } from '../../services/chart.service';
import { Chart } from '../../models/chart';
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
declare var M: any;

@Component({
  selector: 'app-view-main',
  templateUrl: './view-main.component.html',
  styleUrls: ['./view-main.component.css']
})
export class ViewMainComponent implements OnInit {

  constructor(private viewService: ViewService,
    private route: ActivatedRoute,
    private router: Router,
    private cvService: CvService,
    private chartService: ChartService,
    private modalService: ModalService,
    private dragulaService: DragulaService,
    private sampleTypeCategoryService: SampleTypeCategoryService) { }

  @Input() type: string;

  submitButtonText: string;

  selectedSampleTypeCategory: SampleTypeCategory;

  loadedViewDisplay: any = null;

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

  charts: Chart[] = [];
  cv: CV;

  viewDisplay: ViewDisplay[][] = [];

  view: View = new View(null, '', null, null, true,null);

  ngOnInit() {
    this.subscribeToBottomModal();
    this.subscribeToModal();
    this.dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    this.dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    this.dragulaService.setOptions('first-bag', { revertOnSpill: true, copy: false });

    if (this.type === 'defaults') {
      // load charts by cv and send to the list
      this.route.params.subscribe(
        (params) => {
          // Get and set the CV
          this.cvService.getCvByCvId(params['id'])
            .subscribe(
              (cv) => {
                this.view.cv = cv;
                this.cv = cv;
                this.loadSampleTypeCategory(params['qc']);
                this.sendCVToList(cv,params['qc']);
                this.viewService.getDefaultViewNameByCV(this.cv)
                  .subscribe(
                    (view) => {
                      if (view !== null) {
                        // existing view, organize the charts in the display
                        this.submitButtonText = 'Update';
                        this.view = view;
                        // get the view display
                        this.viewService.getDefaultDisplayByView(view)
                          .subscribe(
                            (viewDisplay) => {
                              this.loadDefaultDisplayView(viewDisplay);
                              delay(1).then(() => this.getElementByChartId());

                            }
                          );
                      }else {
                        // new default view
                        this.submitButtonText = 'Save';
                      }
                    }, (error) => {
                      console.log(error);
                    });
              },
              (error) => {
                console.log(error)
              }
            )
        }
      )
    } else {
      // load datasources owned by the node
    }
  }

  private loadSampleTypeCategory(qcId: number): void  {
    this.sampleTypeCategoryService.getSampleTypeCategoryById(qcId)
      .subscribe(
        (sampleTypeCategory) => {
          this.selectedSampleTypeCategory = sampleTypeCategory;
        }
      )
  }

  /**
   * We need to build the display as the view in the database
   * So, it will create the rows and columns with the layout
   * of the database.
   * @param viewDisplay The display from the database
   */
  private loadDefaultDisplayView(viewDisplay: Display): void {
    let charts = [];
    viewDisplay.charts.forEach(
      (row, index) => {
        this.display[index] = [];
        this.chartDisplay[index] = [];
        row.forEach(
          (col) => {
            this.display[index].push(null);
            if(col['chart']===null) {
              this.chartDisplay[index].push(null);  
            }else {
              this.chartDisplay[index].push(col['chart'].id);
              charts.push(col);
            }
          }
        )
      }
    )

    this.loadedViewDisplay = charts;

  }
  private getElementByChartId(): void {
    this.loadedViewDisplay.forEach(
      (chart) => {
        // get chart from list        
        let listedChart = document.getElementById('plotId-' + chart.chart.id);
        // append to its corresponding spot
        let slot = document.getElementById(chart.row + ';' + chart.col);
        slot.appendChild(listedChart);


      }
    )
  }

  onSubmit(): void {
    // Before insert check the layout
    let viewName = this.view.name;
    let formOk = true;
    this.view.sampleTypeCategory = this.selectedSampleTypeCategory;
    if (this.chartDisplay.length == 0) {
      // show modal
      this.modalService.openModal(new Modal('Error', 'You need at least one column', 'Ok', null, 'noRows', viewName));
      formOk = false;
    }

    if (formOk) {
      this.saveDefaultView();
    }
  }
  private saveDefaultView(): void {
    
    this.viewService.addDefaultView(this.view)
      .subscribe(
        (view) => {
          this.prepareViewDisplayArray(view);
        },
        (error) => {
          this.modalService.openModal(new Modal(error.error.error,"Database error",'Ok',null,'saveDefaultView',null));
        }
      )
  }

  private prepareViewDisplayArray(view: View): void {
    this.chartDisplay.forEach(
      (row, index) => {
        this.viewDisplay[index] = [];
        row.forEach(
          (cell, colIndex) => {
            let chart = this.charts.filter(c => c.id == cell);
            this.viewDisplay[index].push(new ViewDisplay(null, chart[0], view, index, colIndex));
          }
        )
      }
    )
    if(this.submitButtonText==='Save') {
      this.saveViewDisplay();
    }else {
      this.updateViewDisplay();
    }
  }
  private updateViewDisplay(): void {
    this.viewService.updateLayoutToDefaultView(this.viewDisplay,this.view.id)
      .subscribe(
        (display) => {
          this.navigateBack('Chart updated!');
        },
        (error) =>{
          this.modalService.openModal(new Modal(error.error.error,"Database error",'Ok',null,'updateViewDisplay',null));
        }
      )
  }

  private saveViewDisplay(): void {
    this.viewService.addLayoutToDefaultView(this.viewDisplay)
    .subscribe(
      (display) => {
        this.navigateBack('Chart saved!');
      },
      (error) =>{
        this.modalService.openModal(new Modal(error.error.error,"Database error",'Ok',null,'saveViewDisplay',null));
      }
    )
  }

  private navigateBack(action: string): void {
    M.toast({html: action});
    this.router.navigate(['/application/administration/views']);
  }

  private loadChartsByCV(cv: CV): void {
    this.charts = [];
    this.chartService.getChartsByCV(cv)
      .subscribe(
        (charts) => {
          charts.forEach(c => {
            this.charts.push(new Chart(c.id, c.name, c.cv, c.sampleType));
          });
        }
      )
  }
  private loadChartsByCVAndSampleTypeCategoryId(cv: CV,sampleTypeCategoryId: number): void {
    this.charts = [];
    //this.chartService.getChartsByCV(cv)
    this.chartService.getChartsByCVAndSampleTypeCategoryId(cv,sampleTypeCategoryId)
      .subscribe(
        (charts) => {
          charts.forEach(c => {
            this.charts.push(new Chart(c.id, c.name, c.cv, c.sampleType));
          });
        }
      )
  }


  private sendCVToList(cv: CV, sampleTypeCategoryId: number): void {
    //get the cv from server
    //this.loadChartsByCV(cv);
    this.loadChartsByCVAndSampleTypeCategoryId(cv,sampleTypeCategoryId);

    // add to the view object
    this.view.cv = cv;
  }

  private onDrop(args) {
    let [e, el] = args;
    let plotId = e.getElementsByClassName('plotId')[0].innerHTML;
    let id = el.getAttribute('id');
    let adding = true;
    /**
     * It will have an id if it is placed
     * in the layout section. This is a way to 
     * know where the item is.
     */

    if (id !== null) {
      // adding     
      adding = true;
    } else {
      // removing
      adding = false;
    }
    let currentElements = el.childElementCount;

    /**
     * If the user tries to add an item in a 
     * bag having a previous item it will cancel
     * the drag.
     * It have a boolean condition for ensure that
     * differenciate the chart pool of the layout
     */
    if (currentElements > 1 && adding && el.getAttribute('id') != 'charts-list') {
      this.dragulaService.find('first-bag').drake.cancel(true);
    } else {
      if (adding) {
        if (el.getAttribute('id') != 'charts-list') {
          // delete from previous position if it was any
          this.removeChartFromDisplay(plotId);
          let position = id.split(';');
          this.addChartIntoDisplay(plotId, position);
        } else {
          //remove
          this.removeChartFromDisplay(plotId);
        }

      } else {
        this.dragulaService.find('first-bag').drake.cancel(true);
      }
    }
  }

  private removeChartFromDisplay(plotId: number): void {
    this.chartDisplay.forEach(
      (row,r) => {
        row.forEach(
          (col,c) => {
            if(col==plotId) {
              this.chartDisplay[r][c] = null;
            }
          }
        )
      }
    )
  }



  private addChartIntoDisplay(plotId: number, position: number[]): void {
    this.chartDisplay[position[0]][position[1]] = plotId;
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something 
    // console.log(el.getAttribute('id'));
  }

  private subscribeToBottomModal(): void {
    this.modalService.selectedBottomModalAction$
      .subscribe(
        (action) => {
          this.doAction(action);
        }
      )
  }

  private subscribeToModal(): void {
    this.modalService.selectedAction$
      .subscribe(
        (action) => {
          this.doAction(action);
        }
      )
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
        break;
      case 'noRows': {
        this.view.name = action.objectInstance;
        break;
      }
      default:
        console.log('error');
        break;
    }
  }

  deleteRow(row: number): void {
    // send information for reestruct the list
    this.chartDisplay[row].forEach(
      (charts, index) => {
        if(charts!==null) {
          let elem = document.getElementById(row + ';' + index);
          let list = document.getElementById('charts-list');
          list.appendChild(elem.firstElementChild);
        }
      }
    )
    this.display.splice(row, 1);
    this.chartDisplay.splice(row, 1);
  }

  private removeChartFromArray(chartId): void {
    for (let i = 0; i < this.charts.length; i++) {
      if (this.charts[i].id == chartId) {
        this.charts.splice(i, 1);
        break;
      }
    }
  }

  addRow(): void {
    this.modalService.openBottomModal(new BottomModal('Add row', 'How many columns do you want', '1', '2', 'newRow', null));
  }

  ngOnDestroy(): void {
    this.dragulaService.destroy('first-bag');
  }
}
