import { CV } from "./cv";
import { Param } from "./param";
import { SampleType } from "./sampleType";

export class CommunityLine {
    id: number;
    apiKey: string;
    name: string;
    cv: CV;
    param: Param;
    sampleType: SampleType;

    constructor(id: number, apiKey: string, name: string, cv: CV, param: Param, sampleType: SampleType) {
        this.id = id;
        this.apiKey = apiKey;
        this.name = name;
        this.cv = cv;
        this.param = param;
        this.sampleType = sampleType;
    }
    
}