import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { DataSourceService } from '../../../services/data-source.service';
import { DataSource } from '../../../models/dataSource';
import { GuideSet } from '../../../models/guideSet';
import { delay } from 'q';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
declare var M: any;
@Component({
  selector: 'app-data-source-guide-set-list',
  templateUrl: './data-source-guide-set-list.component.html',
  styleUrls: ['./data-source-guide-set-list.component.css']
})
export class DataSourceGuideSetListComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private dataSourceService: DataSourceService,
    private modalService: ModalService) { }

  dataSources: DataSource[] = [];

  datePickers: any = [];

  ngOnInit() {
    this.subscribeToCategoryChange();
    this.subscribeToModal();
  }

  private subscribeToCategoryChange(): void {
    this.categoryService.selectedCategory$
      .subscribe(
        (category) => {
          this.loadCvsByCategory(category);
        }
      )
  }
  private loadCvsByCategory(category: Category): void {
    this.dataSourceService.getDataSourcesByCategory(category)
      .subscribe(
        (dataSources) => {
          this.dataSources = [];
          dataSources.forEach((dataSource) => {
            if (dataSource.guideSet == null) {
              dataSource.guideSet = new GuideSet(null, null, null);
            }
            this.dataSources.push(dataSource);
          });
          delay(1).then(() => this.initializeDatePickers());
        }
      )
  }

  private initializeDatePickers(): void {
    this.dataSources.forEach(
      (dataSource) => {
        let datePickers = document.getElementsByClassName('datepicker' + dataSource.id);
        this.datePickers[dataSource.id] = [];
        for (var i = 0; i < datePickers.length; i++) {
          let options = {
            format: 'yyyy-mm-dd',
            firstDay: 1,
            setDefaultDate: true
          }
          let instance = M.Datepicker.init(datePickers[i], options);
          this.datePickers[dataSource.id].push(instance);
        }
      }
    )
  }

  private subscribeToModal(): void {
    this.modalService.selectedAction$
      .subscribe(
        (response) => {
          console.log(response);
        }
      )
  }
  /**
   * Set the selected guide set into the datasource
   * @param ds the datasource to set the dates
   */
  set(ds: DataSource): void {
    /**
     * All this mess is because at this time the ngModel binding
     * was not working properly and the solution was to set
     * the values manually getting from the DOM
     * 2018-04-10
     */    
    let start = this.datePickers[ds.id][0].toString();
    let end = this.datePickers[ds.id][1].toString();
    if (start == '' || end == '') {
      // this.modalService.openModal(new Modal('Information', 'Please, fill both date fields for set the guide set', 'Ok', 'Cancel', 'setGuideSetMissingData', null));
      alert('Fill both start date and end date');
    } else {
      if (this.datePickers[ds.id][0] > this.datePickers[ds.id][1]) {
        // this.modalService.openModal(new Modal('Information', 'End date must be greater than start date', 'Ok', null, 'setGuideSetWrongDates', null));
        alert('End date must be greater than start date');
      } else {
        ds.guideSet.startDate = this.datePickers[ds.id][0].toString();
        ds.guideSet.endDate = this.datePickers[ds.id][1].toString();
        this.updateDataSource(ds);
      }
    }
  }

  private updateDataSource(dataSource: DataSource): void {
    this.dataSourceService.saveGuideSet(dataSource,dataSource.guideSet)
      .subscribe(
        (result)=> {
          M.toast({html: 'Guide set saved!'});
        },
        (error) => {
          console.log(error);
        }
      )

  }  
}
