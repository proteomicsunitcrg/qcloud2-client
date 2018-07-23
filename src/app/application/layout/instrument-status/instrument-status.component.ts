import { Component, OnInit } from '@angular/core';
import { System } from '../../../models/system';
import { SystemService } from '../../../services/system.service';
import { delay } from 'q';
import { ThresholdService } from '../../../services/threshold.service';
import { LabSystemStatus } from '../../../models/labsystemstatus';
declare var M: any;

@Component({
  selector: 'app-instrument-status',
  templateUrl: './instrument-status.component.html',
  styleUrls: ['./instrument-status.component.css']
})
export class InstrumentStatusComponent implements OnInit {

  constructor(private systemService: SystemService,
    private thresholdService: ThresholdService) { }

  nodeLabSystems: {
    system: System,
    status: LabSystemStatus[],
    alerts: {
      quantity: number,
      severity: string
    }
  }[] = [];

  currentStatus: LabSystemStatus[] = [];

  ngOnInit() {
    this.loadNodeLabSystems();
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
        const instance = M.Dropdown.init(elem, { constrainWidth: false });
        instance.open();
      }
    );
  }

}
