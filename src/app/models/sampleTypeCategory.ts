import { SampleType } from './sampleType';
export class SampleTypeCategory {
    id: number;
    name: string;
    sampleTypes: SampleType[];

    constructor(id: number,name:string, sampleTypes: SampleType[]) {
        this.id = id;
        this.name = name;
        this.sampleTypes = sampleTypes;
    }
}