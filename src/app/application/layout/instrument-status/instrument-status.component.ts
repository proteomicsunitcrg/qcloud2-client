import { Component, OnInit, OnDestroy } from '@angular/core';
import { System } from '../../../models/system';
import { SystemService } from '../../../services/system.service';
import { delay } from 'q';
import { ThresholdService } from '../../../services/threshold.service';
import { LabSystemStatus } from '../../../models/labsystemstatus';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
declare var M: any;

@Component({
  selector: 'app-instrument-status',
  templateUrl: './instrument-status.component.html',
  styleUrls: ['./instrument-status.component.css']
})
export class InstrumentStatusComponent implements OnInit, OnDestroy {

  constructor(private systemService: SystemService,
    private thresholdService: ThresholdService,
    private router: Router) { }

  nodeLabSystems: {
    system: System,
    status: LabSystemStatus[],
    alerts: {
      quantity: number,
      severity: string
    }
  }[] = [];

  private newLabSystem$: Subscription;

  currentStatus: LabSystemStatus[] = [];

  currentDropdownInstance: any = null;

  ngOnInit() {
    delay(1000).then(() => this.subscribeToNewLabSystem());
    this.loadNodeLabSystems();
  }

  ngOnDestroy() {
    console.log('me borro');
    this.newLabSystem$.unsubscribe();
  }

  private subscribeToNewLabSystem(): void {
    this.newLabSystem$ = this.systemService.createdLabSystem$
    .subscribe(
      (labSystem) => {
        this.nodeLabSystems.push({
          system: labSystem,
          status: [],
          alerts: {
            quantity: 0,
            severity: 'OK'
          }
        });
      }, err => console.log('err'), () => console.log('end')
    );
    console.log(this.newLabSystem$);
  }


  /**
   * Get the node labsystems and when completes
   * load the instrument status
   */
  private loadNodeLabSystems(): void {
    this.systemService.getSystems()
      .subscribe(
        (labSystems) => {
          labSystems.forEach(
            (labSystem) => {
              this.nodeLabSystems.push({
                system: labSystem,
                status: [],
                alerts: {
                  quantity: 0,
                  severity: 'OK'
                }
              });
            }
          );
        }, err => console.log(err),
        () => {
          this.loadLabSystemStatus();
        }
      );
  }

  private loadLabSystemStatus(): void {
    this.nodeLabSystems.forEach(
      (labSystem) => {
        this.thresholdService.getLabSystemStatus(labSystem.system)
          .subscribe(
            (status) => {
              // labSystem.status = status;
              status.forEach(
                (stat) => {
                  if (stat.status !== 'OK') {
                    stat.labSystemApikey = labSystem.system.apiKey;
                    labSystem.status.push(stat);
                    switch (stat.status) {
                      case 'WARNING':
                        labSystem.alerts.quantity++;
                        if (labSystem.alerts.severity === 'OK') {
                          labSystem.alerts.severity = 'WARNING';
                        }
                        break;
                      case 'DANGER':
                        labSystem.alerts.quantity++;
                        if (labSystem.alerts.severity === 'OK' || labSystem.alerts.severity === 'WARNING') {
                          labSystem.alerts.severity = 'DANGER';
                        }
                        break;
                      case 'NO_DATA':
                        if (labSystem.alerts.severity === 'OK' || labSystem.alerts.severity === 'WARNING') {
                          labSystem.alerts.severity = 'DANGER';
                        }
                        break;

                    }
                  }
                }
              );
            }, err => {
              labSystem.status = null;
            },
            () => {

            }
          );
      }
    );
  }

  open(dropdown: string, index: number): void {
    this.currentStatus = this.nodeLabSystems[index].status;
    delay(1).then(
      () => {
        const elem = document.getElementById(dropdown);
        this.currentDropdownInstance = M.Dropdown.init(elem, { constrainWidth: false, coverTrigger: false });
        this.currentDropdownInstance.open();
      }
    );
  }

  doSendToAutoPlot(labSystemStatus: LabSystemStatus): void {
    this.thresholdService.selectLabSystemStatus(labSystemStatus);
    this.currentDropdownInstance.destroy();
  }

  navigateTo(labSystem: System): void {
    this.router.navigate(['application/view/instrument/' + labSystem.apiKey]);
  }


}
