import { CV } from './cv';
import { SampleType } from './sampleType';
export class Chart {
    id: number;
    name: string;
    cv: CV;
    sampleType: SampleType;
    isThresholdEnabled: boolean;

    constructor(id: number,name:string, cv: CV, sampleType: SampleType,isThresholdEnabled: boolean) {
        this.id = id;
        this.name = name;
        this.cv = cv;
        this.sampleType = sampleType;
        this.isThresholdEnabled = isThresholdEnabled;
    }
}