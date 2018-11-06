import { CV } from './cv';
import { SampleType } from './sampleType';
import { Param } from './param';
export class Chart {
    id: number;
    name: string;
    cv: CV;
    sampleType: SampleType;
    isThresholdEnabled: boolean;
    apiKey: string;
    param: Param;

    constructor(id: number, name: string, cv: CV, sampleType: SampleType, isThresholdEnabled: boolean, apiKey: string, param: Param) {
        this.id = id;
        this.name = name;
        this.cv = cv;
        this.sampleType = sampleType;
        this.isThresholdEnabled = isThresholdEnabled;
        this.apiKey = apiKey;
        this.param = param;
    }
}
