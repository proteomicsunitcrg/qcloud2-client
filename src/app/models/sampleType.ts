import { SampleTypeCategory } from './sampleTypeCategory';

export class SampleType {
    id: number;
    name: string;
    sampleTypeCategory: SampleTypeCategory;
    isMainSampleType: boolean;
    qualityControlControlledVocabulary: string;

    constructor(id: number, name: string, sampleTypeCategory: SampleTypeCategory, isMainSampleType: boolean, qCCV: string) {
        this.id = id;
        this.name = name;
        this.sampleTypeCategory = sampleTypeCategory;
        this.isMainSampleType = isMainSampleType;
        this.qualityControlControlledVocabulary = qCCV;
    }
}
