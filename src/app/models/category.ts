export class Category {
    id: number;
    name: string;
    mainDataSource: boolean;
    apiKey: string;

    constructor(id: number, name: string, mainDataSource: boolean, apiKey: string) {
        this.id = id;
        this.name = name;
        this.mainDataSource = mainDataSource;
        this.apiKey = apiKey;
    }
}
