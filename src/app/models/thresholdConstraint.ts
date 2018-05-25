export class ThresholdConstraint {

    initialValueEditable: boolean;
    stepValueEditable: boolean;
    stepsEditable: boolean;
    singleContextSource: boolean;
    globalStepValue: boolean;
    globalInitialValue: boolean;

    constructor(singleContextSource: boolean,
        initialValueEditable: boolean,
        stepValueEditable: boolean,
        stepsEditable: boolean,
        globalStepValue: boolean,
        globalInitialValue: boolean) {
        this.singleContextSource = singleContextSource;
        this.initialValueEditable = initialValueEditable;
        this.stepValueEditable = stepValueEditable;
        this.stepsEditable = stepsEditable;
        this.globalStepValue = globalStepValue;
        this.globalInitialValue = globalInitialValue;
    }
}
