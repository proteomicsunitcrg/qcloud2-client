export class GeneralAnnotation {
    id: number;
    apiKey: string;
    date: string;
    description: string
    active: boolean;

    constructor(id: number, apiKey: string, date: string, description: string, active: boolean) {
        this.id = id;
        this.date = date;
        this.apiKey = apiKey;
        this.description = description;
        this.active = active;
    }
}