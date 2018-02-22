import { ContextSource} from './contextSource';
import { SampleType } from './sampleType';
export class Peptide extends ContextSource {    
    sequence: string;
    abbreviatedSequence: string;
    sample: SampleType[];
    
    constructor(id:number, name: string,sequence:string,abbreviatedSequence: string, sampleTypes: SampleType[] ) {
        super(id,name);
        this.sequence = sequence;
        this.abbreviatedSequence = abbreviatedSequence;
        this.sample = sampleTypes;
    }
}