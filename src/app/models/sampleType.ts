import { SampleTypeCategory } from './sampleTypeCategory';

export class SampleType {
    id: number;
    name: string;
    sampleTypeCategory: SampleTypeCategory;
    mainSampleType: boolean;
    qualityControlControlledVocabulary: string;

    constructor(id: number, name: string, sampleTypeCategory: SampleTypeCategory, mainSampleType: boolean, qCCV: string) {
        this.id = id;
        this.name = name;
        this.sampleTypeCategory = sampleTypeCategory;
        this.mainSampleType = mainSampleType;
        this.qualityControlControlledVocabulary = qCCV;
    }
}
