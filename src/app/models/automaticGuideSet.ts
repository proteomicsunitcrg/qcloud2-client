import { SampleType } from './sampleType';
import { GuideSet } from './guideSet';

export class AutomaticGuideSet extends GuideSet {

    files: number;

    // tslint:disable-next-line:max-line-length
    constructor(id: number, startDate: string, endDate: string, isActive: boolean, isUserDefined: boolean, sampleType: SampleType, totalFiles: number, labSystemTotalFiles: number, apiKey: string, files: number) {
        super(id, startDate, endDate, isActive, isUserDefined, sampleType, totalFiles, labSystemTotalFiles, apiKey);
        this.files = files;
    }
}
