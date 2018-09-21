import { Param } from './param';
import { ContextSource } from './contextSource';

export class GuideSetContextSourceStatus {
    param: Param;
    contextSource: ContextSource;
    status: string;
    count: number;

    constructor(param: Param, contextSource: ContextSource, status: string, count: number) {
        this.param = param;
        this.contextSource = contextSource;
        this.status = status;
        this.count = count;
    }
}
