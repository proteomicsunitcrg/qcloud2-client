export class ThresholdConstraint {
    
    initialValueEditable: boolean;
	
	stepValueEditable: boolean;
	
	stepsEditable: boolean;

    constructor(initialValueEditable: boolean,stepValueEditable: boolean,stepsEditable: boolean) {
        this.initialValueEditable = initialValueEditable;
        this.stepValueEditable = stepValueEditable;
        this.stepsEditable = stepsEditable
    }
}