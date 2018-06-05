import { Peptide } from './peptide';
export class Isotopologue extends Peptide {

    mainPeptide: Peptide;

    constructor(id: number, name: string, sequence: string, abbreviatedSequence: string, mainPeptide: Peptide) {
        super(id, name, sequence, abbreviatedSequence);
        this.mainPeptide = mainPeptide;
    }
}
