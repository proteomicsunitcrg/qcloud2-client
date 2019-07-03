import { Chart } from './chart';
import { CV } from './cv';
import { SampleType } from './sampleType';
import { System } from './system';
import { Param } from './param';
export class UserChart extends Chart {

    labSystem: System;
    placed: boolean;

    // tslint:disable-next-line:max-line-length
    constructor(id: number, name: string, cv: CV, sampleType: SampleType, isThresholdEnabled: boolean, apiKey: string, labSystem: System, param: Param) {
        super(id, name, cv, sampleType, isThresholdEnabled, apiKey, param, false);
        this.labSystem = labSystem;
        this.placed = false;
    }
}
