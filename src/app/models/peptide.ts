import { ContextSource} from './contextSource';
import { TraceColor } from './TraceColor';
export class Peptide extends ContextSource {
    sequence: string;
    mz: number;
    charge: number;

    constructor(id: number, name: string, sequence: string, abbreviated: string,
        mz: number, charge: number, apiKey: string, traceColor: TraceColor, shadeGrade: number) {
        super(id, name, abbreviated, apiKey, traceColor, shadeGrade);
        this.sequence = sequence;
        this.mz = mz;
        this.charge = charge;
    }
}
