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
    isCommFeat: boolean;


    constructor(id: number, name: string, cv: CV, sampleType: SampleType, isThresholdEnabled: boolean, apiKey: string, param: Param, isCommFeat: boolean
        ) {
        this.id = id;
        this.name = name;
        this.cv = cv;
        this.sampleType = sampleType;
        this.isThresholdEnabled = isThresholdEnabled;
        this.apiKey = apiKey;
        this.param = param;
        this.isCommFeat = isCommFeat;
    }
}
