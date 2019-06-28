import { ThresholdParam } from './thresholdParams';

export class PlotThreshold {
    direction: string;
    steps: number;
    thresholdType: string;
    thresholdParams: ThresholdParam[];
    nonConformityDirection: string;
    monitored: boolean;
    commFeat: boolean;

    constructor(direction: string,
    steps: number,
    thresholdType: string,
    thresholdParam: ThresholdParam[],
    nonConformityDirection: string,
    monitored: boolean,
    commFeat: boolean
    ) {
        this.direction = direction;
        this.steps = steps;
        this.thresholdType = thresholdType;
        this.thresholdParams = thresholdParam;
        this.nonConformityDirection = nonConformityDirection;
        this.monitored = monitored;
        this.commFeat = commFeat;
    }
}
