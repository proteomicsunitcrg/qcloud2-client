import { Threshold } from './threshold';
import { ContextSource } from './contextSource';

export class ThresholdParam {

    threshold: Threshold;
    contextSource: ContextSource;
    stepValue: number;
    initialValue: number;

    constructor(threshold: Threshold,
        contextSource: ContextSource,
        stepValue: number,
        initialValue: number) {
        this.threshold = threshold;
        this.contextSource = contextSource;
        this.stepValue = stepValue;
        this.initialValue = initialValue;
    }
}
