import { SampleTypeCategory } from './sampleTypeCategory';

export class SampleType {
    id: number;
    name: string;
    sampleTypeCategory: SampleTypeCategory;
    isMainSampleType: boolean;

    constructor(id: number, name: string, sampleTypeCategory: SampleTypeCategory, isMainSampleType: boolean) {
        this.id = id;
        this.name = name;
        this.sampleTypeCategory = sampleTypeCategory;
        this.isMainSampleType = isMainSampleType;
    }
}
