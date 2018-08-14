import { SampleType } from './sampleType';

export class GuideSet {
    id: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    isUserDefined: boolean;
    sampleType: SampleType;
    totalFiles: number;
    labSystemTotalFiles: number;
    apiKey: string;

    // tslint:disable-next-line:max-line-length
    constructor(id: number, startDate: string, endDate: string, isActive: boolean, isUserDefined: boolean, sampleType: SampleType, totalFiles: number, labSystemTotalFiles: number, apiKey: string) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.isUserDefined = isUserDefined;
        this.sampleType = sampleType;
        this.totalFiles = totalFiles;
        this.labSystemTotalFiles = labSystemTotalFiles;
        this.apiKey = apiKey;
    }
}
