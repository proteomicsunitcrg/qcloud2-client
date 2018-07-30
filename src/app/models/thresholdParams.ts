import { Threshold } from './threshold';
import { ContextSource } from './contextSource';

export class ThresholdParam {

    threshold: Threshold;
    contextSource: ContextSource;
    stepValue: number;
    initialValue: number;
    isEnabled: boolean;

    constructor(threshold: Threshold,
        contextSource: ContextSource,
        stepValue: number,
        initialValue: number,
        isEnabled: boolean) {
        this.threshold = threshold;
        this.contextSource = contextSource;
        this.stepValue = stepValue;
        this.initialValue = initialValue;
        this.isEnabled = isEnabled;
    }
}
