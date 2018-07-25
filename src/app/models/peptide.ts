import { ContextSource} from './contextSource';
export class Peptide extends ContextSource {
    sequence: string;
    mz: number;
    charge: number;

    constructor(id: number, name: string, sequence: string, abbreviated: string, mz: number, charge: number, apiKey: string) {
        super(id, name, abbreviated, apiKey);
        this.sequence = sequence;
        this.mz = mz;
        this.charge = charge;
    }
}
