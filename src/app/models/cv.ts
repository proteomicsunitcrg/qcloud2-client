import { Category } from './category';

export class CV {
    id: number;
    name: string;
    category: Category;
    definition: string;
    cvid: string;
    enabled: boolean;


    constructor(id: number, name: string, category: Category, definition: string, cv_id: string, enabled: boolean) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.definition = definition;
        this.cvid = cv_id;
        this.enabled = enabled;
    }
}
