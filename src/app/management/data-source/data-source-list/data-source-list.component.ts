import { Component, OnInit, OnDestroy } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { Category } from '../../../models/category';
import { DataSourceService } from '../../../services/data-source.service';
import { CategoryService } from '../../../services/category.service';
import { DataSource } from '../../../models/dataSource';
import { ModalService } from '../../../common/modal.service';
import { Subscription } from 'rxjs/Subscription';
import { Modal } from '../../../models/modal';
import { ModalResponse } from '../../../models/modalResponse';
import { delay } from 'q';
import { GuideSet } from '../../../models/guideSet';

declare var M: any;
/**
 * Data source list component
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-data-source-list',
  templateUrl: './data-source-list.component.html',
  styleUrls: ['./data-source-list.component.css']
})
export class DataSourceListComponent implements OnInit,OnDestroy {

  
  constructor(private dataSourceService: DataSourceService,
    private categoryService: CategoryService,
    private modalService: ModalService) { }
    
    dataSources = [];
    
    
    editingDataSourceName = false;
    editRow = -1;
    dataSourceName = '';
    
  modalSubscription$: Subscription;
  dataSources$: Subscription;
  selectedCategory$: Subscription;

  ngOnDestroy() {
    this.modalSubscription$.unsubscribe();
    this.dataSources$.unsubscribe();
    this.selectedCategory$.unsubscribe();
  }

  ngOnInit() {
    // get the datasource
    // Subscription to new added instruments
    this.dataSources$ = this.dataSourceService.dataSources$
      .subscribe(      
        (dataSources) => {
          this.loadDataSourcesArray(dataSources);
        },
        (error) => {
          console.log(error);
        }
      );    
    // Subscription to a change in the router url for category change
    // it comes by the ngInit of the dataSourceCompoment
    this.selectedCategory$ = this.categoryService.selectedCategory$
      .subscribe(
        (category) => {        
          this.loadDataSourcesByCategory(category);
        },
        (error) => {
          console.log(error);
        });
    // Subscription for modal
    this.modalSubscription$ = this.modalService.selectedAction$.subscribe(
      (action) => {
        this.formAction(action);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  private loadDataSourcesByCategory(category): void {
    this.dataSourceService.getDataSourcesByCategory(category).subscribe(
      (result) =>  {
        this.loadDataSourcesArray(result);
      },
      (error) => {

      }
    )
  }

  private loadDataSourcesArray(dataSources : DataSource[]) {
    this.dataSources = [];
    dataSources.forEach(dataSource => this.dataSources.push(dataSource));
  }

  editDataSource(index): void {
    this.editingDataSourceName = true;
    this.editRow = index;
    // Storing the original name in case of cancel
    this.dataSourceName = this.dataSources[index].name;
    // enable date pickers
    delay(100).then(
      () => {
        this.loadDatePickers(index);
      }
    )
    
  }
  private loadDatePickers(index: number): void {

  }

  saveDataSource(dataSource: DataSource): void {
    
    this.dataSourceService.updateDataSource(dataSource).subscribe(
      (result) => {
        // TODO toast
      },
      (error) => {
        dataSource.name = this.dataSourceName;
        this.modalService.openModal(new Modal(error.error.error,
          error.error.message, 'Ok', '', 'updateError',null));
      }
    )
    this.stopEditing();
  }

  cancelEditing(dataSource: DataSource) {
    dataSource.name = this.dataSourceName;
    this.stopEditing();
  }

  private stopEditing() {
    this.editingDataSourceName = false;
    this.editRow = -1;
  }

  deleteDataSource(dataSource: DataSource) {    
    this.modalService.openModal(new Modal("Delete instrument",
        'This will cause the loss of all your data. Are you sure?', 'Yes', 'No', 'deleteInstrument',dataSource));
  }
  private deleteDataSourceFromServer(dataSource: DataSource) {
    this.dataSourceService.deleteDataSource(dataSource).subscribe(
      (result) => {
        this.loadDataSourcesArray(result);
      },
      (error) => {        
        this.modalService.openModal(new Modal(error.error.error,
          error.error.message, 'Ok', '', 'deleteError',null));
      }
    )
  }

  private formAction(action: ModalResponse) : void {    
    switch(action.modalAction) {
      case 'deleteInstrument': 
        if(action.userAction=='accept') {
          this.deleteDataSourceFromServer(action.objectInstance);
        }
        break;
      case 'deleteError':
        // TODO: may there is a security leak or user is trying to do something weird
        // do some actions
        break;
      case 'updateError':
        // TODO handle this situation
        break;
      default:
        console.log('data-source-list -> unknown action');
        break;
    }

  }

}
