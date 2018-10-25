import { Component, OnInit, OnDestroy } from '@angular/core';
import { System } from '../../../models/system';
import { SystemService } from '../../../services/system.service';
import { delay } from 'q';
import { ThresholdService } from '../../../services/threshold.service';
import { LabSystemStatus } from '../../../models/labsystemstatus';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../services/websocket.service';
import { NodeLabSystemStatus } from '../../../models/nodeLabSystemStatus';
import { Alert } from '../../../models/alert';
declare var M: any;

@Component({
  selector: 'app-instrument-status',
  templateUrl: './instrument-status.component.html',
  styleUrls: ['./instrument-status.component.css']
})
export class InstrumentStatusComponent implements OnInit, OnDestroy {

  constructor(private systemService: SystemService,
    private thresholdService: ThresholdService,
    private webSocketService: WebsocketService,
    private router: Router) { }

  /*
  nodeLabSystems: {
    system: System,
    status: LabSystemStatus[],
    alerts: {
      quantity: number,
      severity: string
    }
  }[] = [];
  */

  nodeLabSystems: NodeLabSystemStatus[] = [];

  private newLabSystem$: Subscription;

  currentStatus: LabSystemStatus[] = [];

  currentDropdownInstance: any = null;


  ngOnInit() {
    delay(1000).then(() => this.subscribeToNewLabSystem());
    this.loadNodeLabSystems();
    this.subscribeToWebSocket();
  }

  ngOnDestroy() {
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
        }, err => console.log('err')
      );
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
              this.nodeLabSystems.push(
                new NodeLabSystemStatus(labSystem, [], new Alert(0, 'OK'))
              );
              /*
              this.nodeLabSystems.push({
                system: labSystem,
                status: [],
                alerts: {
                  quantity: 0,
                  severity: 'OK'
                }
              });
              */
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
              status.forEach(
                (stat) => {
                  if (stat.status !== 'OK') {
                    stat.labSystemApikey = labSystem.system.apiKey;
                    labSystem.status.push(stat);
                  }
                  this.updateLabSystemLight(labSystem, stat);
                }
              );
            }, err => {
              labSystem.status = null;
            }
          );
      }
    );
  }

  private updateLabSystemLight(labSystem: NodeLabSystemStatus, stat: LabSystemStatus): void {
    if (stat.status !== 'OK') {
      stat.labSystemApikey = labSystem.system.apiKey;
      // labSystem.status.push(stat);
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
        case 'OFFLINE':
          labSystem.alerts.severity = 'OFFLINE';
          labSystem.status.length = 0;
          break;
      }
    }
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
    const currentRoute = this.router.url;
    this.currentDropdownInstance.destroy();
    if (currentRoute.includes('application/view/instrument/' + labSystemStatus.labSystemApikey)) {
      this.thresholdService.selectLabSystemStatus(labSystemStatus);
    } else {
      this.router.navigate(['application/view/instrument/' + labSystemStatus.labSystemApikey, {
        'alertData': btoa(JSON.stringify(labSystemStatus))
      }
      ]);
    }
  }

  navigateTo(labSystem: System): void {
    this.router.navigate(['application/view/instrument/' + labSystem.apiKey]);
  }

  closeAlertList(): void {
    this.currentDropdownInstance.close();
  }

  private subscribeToWebSocket(): void {
    this.webSocketService.nonConformities$.subscribe(
      (res) => {
        if (res.action.includes('nc-')) {
          this.manageNonConformitiesFromWebSocket(res.action.substring(3), res.body);
        }
      }
    );
  }


  private manageNonConformitiesFromWebSocket(labSystemApiKey: string, nonConformities: LabSystemStatus[]): void {
    let nodeLabSystem;
    if (nonConformities.length > 0) {
      nodeLabSystem = this.nodeLabSystems.find(nls => {
        return nls.system.apiKey === labSystemApiKey;
      });

      let qc;
      qc = nonConformities[0]['sampleTypeName'];

      let index = this.getNonConformityIndexToDelete(nodeLabSystem.status, nonConformities[0].fileChecksum, qc);
      while (index !== -1) {
        nodeLabSystem.status.splice(index, 1);
        index = this.getNonConformityIndexToDelete(nodeLabSystem.status, nonConformities[0].fileChecksum, qc);
      }
      nonConformities.forEach(
        (nc) => {
          nc.labSystemApikey = labSystemApiKey;
          nodeLabSystem.status.push(nc);
        }
      );
    }
    nodeLabSystem.alerts.quantity = 0;
    nodeLabSystem.alerts.severity = 'OK';
    nodeLabSystem.status.forEach(
      (status) => {
        this.updateLabSystemLight(nodeLabSystem, status);
      }
    );
  }

  private getNonConformityIndexToDelete(labSystemStatus: any, fileChecksum: string, qc: string): number {
    return labSystemStatus.findIndex((status) => {
      if (status.fileChecksum !== fileChecksum && status.sampleTypeName === qc) {
        return true;
      }
    });
  }


}
