import { Peptide } from './peptide';
import { TraceColor } from './TraceColor';
export class Isotopologue extends Peptide {

    mainPeptide: Peptide;
    concentration: number;

    constructor(id: number, name: string, sequence: string, abbreviatedSequence: string,
        mainPeptide: Peptide, mz: number, charge: number, concentration: number,
        apiKey: string, traceColor: TraceColor, shadeGrade: number) {
        super(id, name, sequence, abbreviatedSequence, mz, charge, apiKey, traceColor, shadeGrade);
        this.mainPeptide = mainPeptide;
        this.concentration = concentration;
    }
}
