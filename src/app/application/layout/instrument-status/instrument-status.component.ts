import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'q';
import { Subscription } from 'rxjs';
import { Alert } from '../../../models/alert';
import { File } from '../../../models/file';
import { LabSystemStatus } from '../../../models/labsystemstatus';
import { NodeLabSystemStatus } from '../../../models/nodeLabSystemStatus';
import { System } from '../../../models/system';
import { FileService } from '../../../services/file.service';
import { SystemService } from '../../../services/system.service';
import { ThresholdService } from '../../../services/threshold.service';
import { WebsocketService } from '../../../services/websocket.service';
import { Param } from '../../../models/param';
import { ContextSource } from '../../../models/contextSource';
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
    private fileService: FileService,
    private router: Router) { }

  nodeLabSystems: NodeLabSystemStatus[] = [];

  private nonConformitiesFromWebsocket$: Subscription;
  private newLabSystemFromWebsocket$: Subscription;

  currentStatus: LabSystemStatus[] = [];

  currentDropdownInstance: any = null;
  oneOffline = false;


  ngOnInit() {
    this.loadNodeLabSystems();
    this.subscribeToWebSocket();
    this.subscribeToNewLabSystemFromWebsocket();
  }

  ngOnDestroy() {
    this.newLabSystemFromWebsocket$.unsubscribe();
    this.nonConformitiesFromWebsocket$.unsubscribe();
  }

  public newTab(apiKey: String): void {
    window.open('/application/view/instrument/' + apiKey, 'blank');
  }

  private subscribeToNewLabSystemFromWebsocket(): void {
    this.newLabSystemFromWebsocket$ = this.webSocketService.newLabSystemFromWebSocket$
      .subscribe(
        (res) => {
          this.nodeLabSystems.push({
            system: res.body,
            status: [],
            alerts: {
              quantity: 0,
              severity: 'OFFLINE' // By default the new labsystem is offline
            }
          });
        }
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
                  if (stat.status === 'DANGER' || stat.status === 'WARNING') {
                    stat.labSystemApikey = labSystem.system.apiKey;
                    labSystem.status.push(stat);
                  } else if (stat.status === 'OFFLINE') {
                    this.getLastFile(labSystem.system.apiKey).then((res) =>
                      labSystem.status.push(new LabSystemStatus(null, null, 'OFFLINE', 'Last QC01 file: ' +
                      this.parseDate(res.creationDate), labSystem.system.apiKey, 'TIME', null))
                    );
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

  private parseDate(date: Date): string {
    const date1 = new Date(date).getTime();
    const date2 = new Date().getTime();
    const time = date2 - date1;  // msec
    const hoursDiff = Math.round(time / (3600 * 1000));
    if (hoursDiff >= 720) {
      return Math.round((hoursDiff / 24) / 30) + ' months ago';
    } else if (hoursDiff >= 48) {
      return Math.round(hoursDiff / 24) + ' days ago';
    }
    return hoursDiff.toString() + ' hours ago';
  }

  private getLastFile(lsApiKey: string): Promise<File> {
    return this.fileService.getLastFileBySampleTypeQCCVAndLabSystem('QC:0000005', lsApiKey).toPromise();
  }

  private updateLabSystemLight(labSystem: NodeLabSystemStatus, stat: LabSystemStatus): void {
    if (stat.status !== 'OK') {
      stat.labSystemApikey = labSystem.system.apiKey;
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
    this.router.navigate(['application/view/instrument/' + labSystem.apiKey, ]);
  }

  closeAlertList(): void {
    this.currentDropdownInstance.close();
  }

  private subscribeToWebSocket(): void {
    this.nonConformitiesFromWebsocket$ = this.webSocketService.nonConformities$.subscribe(
      (res) => {
        this.manageNonConformitiesFromWebSocket(res.action, res.body);
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
          if (nc.status !== 'OK') {
            nc.labSystemApikey = labSystemApiKey;
            nodeLabSystem.status.push(nc);
          }
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
