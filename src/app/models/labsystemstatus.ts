import { Param } from './param';
import { ContextSource } from './contextSource';

export class LabSystemStatus {
    param: Param;
    contextSource: ContextSource;
    status: string;
    thresholdId: number;
    labSystemApikey: string;
    sampleTypeQccv: string;

    constructor(param: Param, contextSource: ContextSource, status: string,
        thresholdId: number, labSystemApikey: string, sampleTypeQccv: string) {

        this.param = param;
        this.contextSource = contextSource;
        this.status = status;
        this.thresholdId = thresholdId;
        this.labSystemApikey = labSystemApikey;
        this.sampleTypeQccv = sampleTypeQccv;
    }
}
