import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuideSet } from '../../../models/guideSet';
import { delay } from 'q';
import { ModalService } from '../../../common/modal.service';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { Subscription } from 'rxjs';
declare var M: any;
@Component({
  selector: 'app-data-source-guide-set-list',
  templateUrl: './data-source-guide-set-list.component.html',
  styleUrls: ['./data-source-guide-set-list.component.css']
})
export class DataSourceGuideSetListComponent implements OnInit, OnDestroy {

  constructor(private systemService: SystemService,
    private modalService: ModalService) { }

  systems: System[] = [];

  datePickers: any = [];

  selectedAction$: Subscription;

  ngOnInit() {
    this.loadSystems();
    this.subscribeToModal();
  }
  ngOnDestroy() {
    this.selectedAction$.unsubscribe();
  }

  private loadSystems(): void {
    this.systemService.getSystems()
      .subscribe(
        (systems) => {
          systems.forEach(
            (system) => {
              if (system.guideSet === null) {
                system.guideSet = new GuideSet(null, null, null);
              }
              this.systems.push(system);
            }
          );
        }, err => console.log(err),
        () => {
          delay(1).then(
            () => {
              this.initializeDatePickers();
            }
          );
        }
      );
  }

  private initializeDatePickers(): void {
    this.systems.forEach(
      (system) => {
        const datePickers = document.getElementsByClassName('datepicker' + system.apiKey);
        this.datePickers[system.apiKey] = [];
        for (let i = 0; i < datePickers.length; i++) {
          const options = {
            format: 'yyyy-mm-dd',
            firstDay: 1,
            setDefaultDate: true
          };
          const instance = M.Datepicker.init(datePickers[i], options);
          this.datePickers[system.apiKey].push(instance);
        }
      }
    );
  }

  private subscribeToModal(): void {
    this.selectedAction$ = this.modalService.selectedAction$
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }
  /**
   * Set the selected guide set into the datasource
   * @param ds the datasource to set the dates
   */
  set(system: System): void {
    /**
     * All this mess is because at this time the ngModel binding
     * was not working properly and the solution was to set
     * the values manually getting from the DOM
     * 2018-04-10
     */
    const start = this.datePickers[system.apiKey][0].toString();
    const end = this.datePickers[system.apiKey][1].toString();
    if (start === '' || end === '') {
      alert('Fill both start date and end date');
    } else {
      if (this.datePickers[system.apiKey][0] > this.datePickers[system.apiKey][1]) {
        alert('End date must be greater than start date');
      } else {
        system.guideSet.startDate = this.datePickers[system.apiKey][0].toString();
        system.guideSet.endDate = this.datePickers[system.apiKey][1].toString();
        this.updateDataSource(system);
      }
    }
  }

  private updateDataSource(system: System): void {
    this.systemService.saveGuideSet(system, system.guideSet)
      .subscribe(
        (result) => {
          M.toast({html: 'Guide set saved!'});
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
