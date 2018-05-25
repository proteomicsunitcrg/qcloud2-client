import { Param } from "./param";
import { CV } from "./cv";
import { ContextSource } from "./contextSource";
import { SampleType } from "./sampleType";

export class Threshold {
    id: number;
    name: string;
    direction: string;
    steps: number;
    param: Param;
    cv: CV;
    sampleType: SampleType;
    thresholdType: string;
    isMonitored: boolean;
    
    constructor(id: number,
        name:string,
        direction: string,
        steps: number,        
        param: Param,
        cv: CV,
        sampleType: SampleType,
        thresholdType: string,
        isMonitored: boolean) {
            this.id = id;
            this.name = name;
            this.direction = direction;
            this.steps = steps;
            this.param = param;
            this.cv = cv;
            this.sampleType = sampleType;
            this.thresholdType = thresholdType;
            this.isMonitored = isMonitored;
    }
}