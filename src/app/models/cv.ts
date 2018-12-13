import { Category } from './category';
import { SampleType } from './sampleType';

export class CV {
    id: number;
    name: string;
    category: Category;
    definition: string;
    cvid: string;
    enabled: boolean;
    sampleTypes: SampleType[];

    // tslint:disable-next-line:max-line-length
    constructor(id: number, name: string, category: Category, definition: string, cv_id: string, enabled: boolean, sampleTypes: SampleType[]) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.definition = definition;
        this.cvid = cv_id;
        this.enabled = enabled;
        this.sampleTypes = sampleTypes;
    }
}
