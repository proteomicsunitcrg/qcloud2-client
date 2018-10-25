import { System } from './system';
import { LabSystemStatus } from './labsystemstatus';
import { Alert } from './alert';

export class NodeLabSystemStatus {
    system: System;
    status: LabSystemStatus[];
    alerts: Alert;

    constructor(system: System, status: LabSystemStatus[], alerts: Alert) {
        this.system = system;
        this.status = status;
        this.alerts = alerts;
    }
}
