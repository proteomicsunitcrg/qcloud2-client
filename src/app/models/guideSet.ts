export class GuideSet {
    id: number;
    startDate: string;
    endDate: string;

    constructor(id: number,startDate:string, endDate: string) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}