import { ContextSource} from './contextSource';
export class Peptide extends ContextSource {
    sequence: string;
    abbreviatedSequence: string;
    mz: number;
    charge: number;

    constructor(id: number, name: string, sequence: string, abbreviatedSequence: string, mz: number, charge: number) {
        super(id, name);
        this.sequence = sequence;
        this.abbreviatedSequence = abbreviatedSequence;
        this.mz = mz;
        this.charge = charge;
    }
}
