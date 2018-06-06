import { Peptide } from './peptide';
export class Isotopologue extends Peptide {

    mainPeptide: Peptide;

    constructor(id: number, name: string, sequence: string, abbreviatedSequence: string, mainPeptide: Peptide, mz: number, charge: number) {
        super(id, name, sequence, abbreviatedSequence, mz, charge);
        this.mainPeptide = mainPeptide;
    }
}
