export class Param {
    id: number;
    name: string;
    isFor: string;

    constructor(id: number,name:string,isFor: string) {
        this.id = id;
        this.name = name;
        this.isFor = isFor;
    }
}