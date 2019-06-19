import { Param } from './param';
import { CV } from './cv';
import { SampleType } from './sampleType';
import { System } from './system';

export class Threshold {
    id: number;
    name: string;
    nonConformityDirection: string;
    steps: number;
    param: Param;
    cv: CV;
    sampleType: SampleType;
    thresholdType: string;
    isMonitored: boolean;
    apiKey: string;
    labSystem: System;
    isCommFeat: boolean;

    constructor(id: number,
        name: string,
        nonConformityDirection: string,
        steps: number,
        param: Param,
        cv: CV,
        sampleType: SampleType,
        thresholdType: string,
        isMonitored: boolean,
        apiKey: string,
        labSystem: System,
        isCommFeat: boolean) {
            this.id = id;
            this.name = name;
            this.nonConformityDirection = nonConformityDirection;
            this.steps = steps;
            this.param = param;
            this.cv = cv;
            this.sampleType = sampleType;
            this.thresholdType = thresholdType;
            this.isMonitored = isMonitored;
            this.apiKey = apiKey;
            this.labSystem = labSystem;
            this.isCommFeat = isCommFeat;
    }
}
