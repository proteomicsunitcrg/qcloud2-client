import { SampleTypeCategory } from "./sampleTypeCategory";

export class SampleType {
    id: number;
    name: string;
    sampleTypeCategory: SampleTypeCategory;

    constructor(id: number,name:string, sampleTypeCategory: SampleTypeCategory) {
        this.id = id;
        this.name = name;
        this.sampleTypeCategory = sampleTypeCategory;
    }
}