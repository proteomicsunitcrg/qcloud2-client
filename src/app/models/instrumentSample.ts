import { ContextSource} from './contextSource';
import { TraceColor } from './TraceColor';
export class InstrumentSample extends ContextSource {

    qCCV: string;

    constructor(id: number, name: string, abbreviated: string, qCCV: string, apiKey: string, traceColor: TraceColor, shadeGrade: number) {
        super(id, name, abbreviated, apiKey, traceColor, shadeGrade);
        this.qCCV = qCCV;
    }
}
