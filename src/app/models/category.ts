export class Category {
    id: number;
    name: string;
    mainDataSource: boolean;

    constructor(id: number, name: string, mainDataSource: boolean) {
        this.id = id;
        this.name = name;
        this.mainDataSource = mainDataSource;
    }
}
