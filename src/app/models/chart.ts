import { CV } from './cv';
import { SampleType } from './sampleType';
export class Chart {
    id: number;
    name: string;
    cv: CV;
    sampleType: SampleType;

    constructor(id: number,name:string, cv: CV, sampleType: SampleType) {
        this.id = id;
        this.name = name;
        this.cv = cv;
        this.sampleType = sampleType;
    }
}