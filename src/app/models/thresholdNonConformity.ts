import { ContextSource } from './contextSource';
import { GuideSet } from './guideSet';

export class ThresholdNonConformity {

    contextSource: ContextSource;
    guideSet: GuideSet;
    file: File;

    constructor(contextSource: ContextSource, guideSet: GuideSet, file: File) {
        this.contextSource = contextSource;
        this.guideSet = guideSet;
        this.file = file;
    }
}
