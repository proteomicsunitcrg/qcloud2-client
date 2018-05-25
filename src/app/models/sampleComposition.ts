import { Peptide } from './peptide';
import { SampleType} from './sampleType';
export class SampleComposition {
    peptide: Peptide;
    sampleType: SampleType;
    concentration: number;

    constructor(peptide: Peptide, sampleType: SampleType, concentration: number) {
        this.peptide = peptide;
        this.sampleType = sampleType;
        this.concentration = concentration;
    }
}
