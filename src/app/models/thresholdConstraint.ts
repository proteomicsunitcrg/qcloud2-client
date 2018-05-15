export class ThresholdConstraint {
    
    initialValueEditable: boolean;
	
	stepValueEditable: boolean;
	
    stepsEditable: boolean;
    
    singleContextSource: boolean;

    constructor(singleContextSource: boolean, initialValueEditable: boolean,stepValueEditable: boolean,stepsEditable: boolean) {
        this.singleContextSource = singleContextSource;
        this.initialValueEditable = initialValueEditable;
        this.stepValueEditable = stepValueEditable;
        this.stepsEditable = stepsEditable
    }
}