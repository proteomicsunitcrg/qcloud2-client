export class Param {
    id: number;
    name: string;
    isFor: string;
    processor: string;
    qCCV: string;
    isZeroNoData: boolean;

    constructor(id: number, name: string, isFor: string, processor: string, qCCV: string, isZeroNoData: boolean) {
        this.id = id;
        this.name = name;
        this.isFor = isFor;
        this.processor = processor;
        this.qCCV = qCCV;
        this.isZeroNoData = isZeroNoData;
    }
}
