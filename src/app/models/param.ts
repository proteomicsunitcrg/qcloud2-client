export class Param {
    id: number;
    name: string;
    isFor: string;
    processor: string;

    constructor(id: number, name: string, isFor: string, processor: string) {
        this.id = id;
        this.name = name;
        this.isFor = isFor;
        this.processor = processor;
    }
}
