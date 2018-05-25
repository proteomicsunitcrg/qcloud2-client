import { User } from './user';
import { CV } from './cv';
import { SampleTypeCategory } from './sampleTypeCategory';
export class View {
    id: number;
    name: string;
    user: User;
    cv: CV;
    isDefault: boolean;
    sampleTypeCategory: SampleTypeCategory;

    constructor(id: number, name: string, user: User, cv: CV, isDefault: boolean, sampleTypeCategory: SampleTypeCategory) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.cv = cv;
        this.isDefault = isDefault;
        this.sampleTypeCategory = sampleTypeCategory;
    }
}
