import { System } from './system';
import { Threshold } from './threshold';

export class LabSystemThreshold {
    labSystem: System;
    thresholds: Threshold[];

    constructor(labSystem: System, thresholds: Threshold[]) {
        this.labSystem = labSystem;
        this.thresholds = thresholds;
    }
}
