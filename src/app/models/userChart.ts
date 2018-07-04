import { Chart } from './chart';
import { CV } from './cv';
import { SampleType } from './sampleType';
import { System } from './system';
export class UserChart extends Chart {

    labSystem: System;

    // tslint:disable-next-line:max-line-length
    constructor(id: number, name: string, cv: CV, sampleType: SampleType, isThresholdEnabled: boolean, apiKey: string, labSystem: System) {
        super(id, name, cv, sampleType, isThresholdEnabled, apiKey);
        this.labSystem = labSystem;
    }
}
