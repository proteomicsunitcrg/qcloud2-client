import { Component, OnInit } from '@angular/core';
import { ThresholdService } from '../../../services/threshold.service';
import { Threshold } from '../../../models/threshold';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
import { delay } from 'q';
declare var M: any;

@Component({
  selector: 'app-threshold-list',
  templateUrl: './threshold-list.component.html',
  styleUrls: ['./threshold-list.component.css']
})
export class ThresholdListComponent implements OnInit {

  constructor(private thresholdService: ThresholdService,
    private labSystemService: SystemService,
    private modalService: ModalService) { }

  labSystemThresholds: { labSystem: System, thresholds: Threshold[] }[] = [];

  ngOnInit() {
    this.labSystemService.getSystems()
      .subscribe(
        (labSystems) => {
          this.loadThresholds(labSystems);
        }, err => console.log(err)
      )
  }

  private loadThresholds(labSystems: System[]): void {
    labSystems.forEach(
      (labSystem) => {
        this.thresholdService.getAllThresholdsBySystem(labSystem)
          .subscribe(
            (thresholds) => {
              let thresholdList: Threshold[] = [];
              thresholds.forEach(
                (threshold) => {
                  /**
                   * Adding the property edditing for let
                   * the ngContainer work without a big mess
                   */
                  threshold['editing'] = false;
                  /**
                   * Adding global values in case of global
                   * step value and global initial value
                   * I am picking the first value of the params array
                   * because it should be the same in every param as it 
                   * is configured as global values
                   */
                  if(threshold['managerThresholdConstraint'].globalInitialValue) {
                    threshold['globalInitialValue'] = threshold['thresholdParams'][0].initialValue;
                  }
                  if(threshold['managerThresholdConstraint'].globalStepValue) {
                    threshold['globalStepValue'] = threshold['thresholdParams'][0].stepValue;
                  }
                  thresholdList.push(threshold);
                }
              )              
              this.labSystemThresholds.push({
                labSystem: labSystem,
                thresholds: thresholdList
              })
              
            }, err => console.log(err),
            () => console.log(this.labSystemThresholds)
          )
      }
    )
  }
  /**
   * Toggle the selected threshold monitoring on/off
   * @param cv 
   */
  changeStatus(threshold: Threshold) {
    this.thresholdService.changeEnabled(threshold.id)
      .subscribe(
        (res) => {
          // change color
          threshold.isMonitored = !threshold.isMonitored;
        },
        (err) => {
          // show modal
          this.modalService.openModal(new Modal('Error',err.error.message,
        'Ok',null,'switchMonitoring',null));
        }
      )
  }

  editThreshold(threshold: Threshold): void {
    threshold['edditing'] = !threshold['edditing'];
    delay(1).then(()=>M.updateTextFields());
  }

  saveThresholdParams(threshold: Threshold): void {
    threshold['thresholdParams'].forEach(
      (param) => {
        param['initialValue'] = threshold['globalInitialValue'];
        param['stepValue'] = threshold['globalStepValue'];
      }
    )
    threshold['edditing'] = !threshold['edditing'];
    console.log(threshold);
    this.thresholdService.updateThresholdParams(threshold.id,threshold['thresholdParams'])
      .subscribe(
        (res)=> console.log(res),
        (err)=> console.log(err)
      )
    
  }



}
