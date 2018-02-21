import { Peptide } from './peptide';
export class SampleType {
    id: number;
    name: string;
    peptides: Peptide[];

    constructor(id: number,name:string, peptides: Peptide[]) {
        this.id = id;
        this.name = name;
        this.peptides = peptides;
    }
}