import { Param } from './param';
import { ContextSource } from './contextSource';

export class LabSystemStatus {
    param: Param;
    contextSource: ContextSource;
    status: string;
    thresholdApiKey: string;
    labSystemApikey: string;
    sampleTypeQccv: string;
    fileChecksum: string;

    constructor(param: Param, contextSource: ContextSource, status: string,
        thresholdApiKey: string, labSystemApikey: string, sampleTypeQccv: string, fileChecksum: string) {

        this.param = param;
        this.contextSource = contextSource;
        this.status = status;
        this.thresholdApiKey = thresholdApiKey;
        this.labSystemApikey = labSystemApikey;
        this.sampleTypeQccv = sampleTypeQccv;
        this.fileChecksum = fileChecksum;
    }
}
