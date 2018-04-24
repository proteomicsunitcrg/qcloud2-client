export class Category {
    id: number;
    name: string;
    isMain: boolean;

    constructor(id: number,name:string,isMain: boolean) {
        this.id = id;
        this.name = name;
        this.isMain = isMain;
    }
}