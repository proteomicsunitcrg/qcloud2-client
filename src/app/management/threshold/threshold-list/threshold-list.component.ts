import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThresholdService } from '../../../services/threshold.service';
import { Threshold } from '../../../models/threshold';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
import { delay } from 'q';
import { GuideSetService } from '../../../services/guide-set.service';
import { LabSystemThreshold } from '../../../models/labSystemThreshold';
import { GuideSetContextSourceStatus } from '../../../models/guideSetContextSourceStatus';
import { Subscription } from 'rxjs';
import { ModalResponse } from '../../../models/modalResponse';
import { ContextSource } from '../../../models/contextSource';
declare var M: any;

@Component({
  selector: 'app-threshold-list',
  templateUrl: './threshold-list.component.html',
  styleUrls: ['./threshold-list.component.css']
})
export class ThresholdListComponent implements OnInit, OnDestroy {

  constructor(private thresholdService: ThresholdService,
    private labSystemService: SystemService,
    private modalService: ModalService,
    private guideSetService: GuideSetService) { }


  labSystemThresholds: LabSystemThreshold[] = [];

  viewThresholdContextSources: string;

  modalSubscription$: Subscription;

  currentContextSource: any;

  ngOnInit() {
    this.labSystemService.getSystems()
      .subscribe(
        (labSystems) => {
          this.loadThresholds(labSystems);
        }, err => console.log(err)
      );
    this.subscribeToModal();
  }

  ngOnDestroy() {
    this.modalSubscription$.unsubscribe();
  }


  private loadThresholds(labSystems: System[]): void {
    labSystems.forEach(
      (labSystem) => {
        this.thresholdService.getAllThresholdsBySystem(labSystem)
          .subscribe(
            (thresholds) => {
              const thresholdList: Threshold[] = [];
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
                  if (threshold['managerThresholdConstraint'].globalInitialValue) {
                    threshold['globalInitialValue'] = threshold['thresholdParams'][0].initialValue;
                  }
                  if (threshold['managerThresholdConstraint'].globalStepValue) {
                    threshold['globalStepValue'] = threshold['thresholdParams'][0].stepValue;
                  }
                  thresholdList.push(threshold);
                }
              );
              this.labSystemThresholds.push({
                labSystem: labSystem,
                thresholds: thresholdList
              });
            }, err => console.log(err)
          );
      }
    );
  }
  /**
   * Toggle the selected threshold monitoring on/off
   * @param cv
   */
  changeStatus(threshold: Threshold) {
    this.thresholdService.changeEnabled(threshold.apiKey)
      .subscribe(
        (res) => {
          // change color
          threshold.isMonitored = !threshold.isMonitored;
        },
        (err) => {
          // show modal
          this.modalService.openModal(new Modal('Error', err.error.message,
            'Ok', null, 'switchMonitoring', null));
        }
      );
  }

  editThreshold(threshold: Threshold): void {
    threshold['edditing'] = !threshold['edditing'];
    delay(1).then(() => M.updateTextFields());
  }

  saveThresholdParams(threshold: Threshold): void {
    threshold['thresholdParams'].forEach(
      (param) => {
        param['initialValue'] = threshold['globalInitialValue'];
        param['stepValue'] = threshold['globalStepValue'];
      }
    );
    threshold['edditing'] = !threshold['edditing'];
    this.thresholdService.updateThresholdParams(threshold.apiKey, threshold['thresholdParams'])
      .subscribe(
        (res) => { },
        (err) => console.log(err)
      );
  }

  changeContextSourceStatus(threshold: Threshold, contextSource: any, labSystemThreshold: LabSystemThreshold): void {
    this.currentContextSource = contextSource;
    console.log('this', this.currentContextSource);
    if (!contextSource['isEnabled']) {
      this.guideSetService.checkCurrentGuideSet(labSystemThreshold.labSystem.apiKey,
        threshold.sampleType.qualityControlControlledVocabulary,
        contextSource['contextSource']['apiKey'])
        .subscribe(
          (guideSetContextSourceStatus) => {
            this.checkGuideSetContextSourceStatus(guideSetContextSourceStatus, contextSource['contextSource'], threshold);
          }, err => console.log(err)
        );
    } else {
      this.changeContextSourceEnabled(threshold, contextSource['contextSource']);
    }
  }

  private checkGuideSetContextSourceStatus(guideSetContextSourceStatus: GuideSetContextSourceStatus,
    contextSource: ContextSource,
    threshold: Threshold): void {

    if (guideSetContextSourceStatus !== null) {
      // const status = guideSetContextSourceStatus.find(gscs => gscs.contextSource.apiKey === contextSource.apiKey);
        if (guideSetContextSourceStatus.status === 'NO_VALID') {
          this.modalService.openModal(new Modal('Warning', guideSetContextSourceStatus.contextSource.name +
            ' does not have the minimum points to keep your current guide set working. ' +
            'If you want to start monitoring this parameter your guide set will ' +
            'be set to automatic until you set a new one.',
            'Yes',
            'Cancel',
            'checkGuideSet', { 'status': status, 'threshold': threshold}));
        } else {
          this.changeContextSourceEnabled(threshold, contextSource);
        }
    } else {
      this.changeContextSourceEnabled(threshold, contextSource);
    }

  }

  private subscribeToModal(): void {
    this.modalSubscription$ = this.modalService.selectedAction$
      .subscribe(
        (modalResponse) => {
          switch (modalResponse.modalAction) {
            case 'checkGuideSet':
              this.doCheckGuideSetModal(modalResponse);
              break;
          }
        }
      );
  }

  private doCheckGuideSetModal(modalResponse: ModalResponse): void {
    switch (modalResponse.userAction) {
      case 'accept':
        // tslint:disable-next-line:max-line-length
        this.thresholdService.changeContextSourceEnabled(modalResponse.objectInstance['threshold'], this.currentContextSource.contextSource)
          .subscribe(
            (res) => {
              this.currentContextSource['isEnabled'] = !this.currentContextSource['isEnabled'];
            }, err => console.log(err),
            () => {
              this.guideSetService.resetLabSystemGuideSet(modalResponse.objectInstance['threshold'])
                .subscribe(
                  (res) => {
                    M.toast({'html': 'Guide set reset to automatic!'});
                  }, err => console.log('reset', err)
                );
            }
          );
        break;
      case 'cancel':
        console.log(modalResponse.objectInstance['contextSource']);

        break;
    }
  }

  private changeContextSourceEnabled(threshold: Threshold, contextSource: ContextSource): void {
    this.thresholdService.changeContextSourceEnabled(threshold, contextSource)
    .subscribe(
      (res) => {
        this.currentContextSource['isEnabled'] = !this.currentContextSource['isEnabled'];
      }, err => console.log(err)
    );
  }

}
