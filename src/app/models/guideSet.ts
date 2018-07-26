export class GuideSet {
    id: number;
    startDate: string;
    endDate: string;
    isActive: boolean;

    constructor(id: number, startDate: string, endDate: string, isActive: boolean) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
    }
}
