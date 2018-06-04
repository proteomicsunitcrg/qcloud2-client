import { SampleType } from './sampleType';
export class SampleTypeCategory {
    id: number;
    name: string;
    sampleTypes: SampleType[];
    sampleTypeComplexity: string;

    constructor(id: number, name: string, sampleTypes: SampleType[], complexity: string) {
        this.id = id;
        this.name = name;
        this.sampleTypes = sampleTypes;
        this.sampleTypeComplexity = complexity;
    }
}
