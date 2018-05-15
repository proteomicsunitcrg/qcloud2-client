import { Param } from "./param";
import { CV } from "./cv";
import { ContextSource } from "./contextSource";
import { SampleType } from "./sampleType";
import { ThresholdParam } from "./thresholdParams";

export class PlotThreshold {
    direction: string;
    steps: number;
    thresholdType: string;
    thresholdParams: ThresholdParam[];
    nonConformityDirection: string;

    constructor(direction: string,
    steps: number,
    thresholdType: string,
    thresholdParam: ThresholdParam[],
    nonConformityDirection: string) {
        this.direction = direction;
        this.steps = steps;
        this.thresholdType = thresholdType;
        this.thresholdParams = thresholdParam;
        this.nonConformityDirection = nonConformityDirection;
    }
}