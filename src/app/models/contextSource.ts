import { TraceColor } from './TraceColor';

export class ContextSource {
    id: number;
    name: string;
    abbreviated: string;
    apiKey: string;
    traceColor: TraceColor;
    shadeGrade: number;

    constructor(id: number, name: string, abbreviated: string, apiKey: string, traceColor: TraceColor, shadeGrade: number) {
        this.id = id;
        this.name = name;
        this.abbreviated = abbreviated;
        this.apiKey = apiKey;
        this.traceColor = traceColor;
        this.shadeGrade = shadeGrade;
    }
}
