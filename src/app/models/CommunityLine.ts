import { CV } from './cv';
import { Param } from './param';
import { SampleType } from './sampleType';
import { ContextSource } from './contextSource';
import { CommunityPartner } from './CommunityPartner';
import { TraceColor } from './TraceColor';

export class CommunityLine {
    id: number;
    apiKey: string;
    name: string;
    instrument: CV;
    param: Param;
    sampleType: SampleType;
    contextSource: ContextSource;
    value: number;
    communityPartner: CommunityPartner;
    traceColor: TraceColor;
    alias: string;

    constructor(id: number, apiKey: string, name: string, instrument: CV, param: Param,
        sampleType: SampleType, contextSource: ContextSource, value: number,
        communityPartner: CommunityPartner, traceColor: TraceColor, alias: string) {
        this.id = id;
        this.apiKey = apiKey;
        this.name = name;
        this.instrument = instrument;
        this.param = param;
        this.sampleType = sampleType;
        this.contextSource = contextSource;
        this.value = value;
        this.communityPartner = communityPartner;
        this.traceColor = traceColor;
        this.alias = alias;
    }
}
