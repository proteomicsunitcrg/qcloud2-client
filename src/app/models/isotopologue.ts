import { Peptide } from './peptide';
export class Isotopologue extends Peptide {

    mainPeptide: Peptide;
    concentration: number;

    constructor(id: number, name: string, sequence: string, abbreviatedSequence: string,
        mainPeptide: Peptide, mz: number, charge: number, concentration: number, apiKey: string) {
        super(id, name, sequence, abbreviatedSequence, mz, charge, apiKey);
        this.mainPeptide = mainPeptide;
        this.concentration = concentration;
    }
}
