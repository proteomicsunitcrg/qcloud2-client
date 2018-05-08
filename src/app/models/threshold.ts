import { Param } from "./param";
import { CV } from "./cv";
import { ContextSource } from "./contextSource";
import { SampleType } from "./sampleType";

export class Threshold {
    id: number;
    name: string;
    direction: string;
    steps: number;
    stepValue: number;
    initialValue: number;
    param: Param;
    cv: CV;
    contextSources: ContextSource[];
    sampleType: SampleType;
    type: string;
    
    constructor(id: number,
        name:string,
        direction: string,
        steps: number,
        stepValue: number,
        initialValue: number,
        param: Param,
        cv: CV,
        contextSources: ContextSource[],
        sampleType: SampleType,
        type: string) {
            this.id = id;
            this.name = name;
            this.direction = direction;
            this.steps = steps;
            this.stepValue = stepValue;
            this.initialValue = initialValue;
            this.param = param;
            this.cv = cv;
            this.contextSources = contextSources;
            this.sampleType = sampleType;
            this.type = type;
    }
}