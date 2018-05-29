import { Param } from './param';
import { ContextSource } from './contextSource';

export class LabSystemStatus {
    param: Param;
    contextSource: ContextSource;
    status: string;

    constructor(param: Param, contextSource: ContextSource, status: string) {
        this.param = param;
        this.contextSource = contextSource;
        this.status = status;
    }
}
