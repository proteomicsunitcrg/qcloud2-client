import { ContextSource} from './contextSource';
export class Peptide extends ContextSource {    
    sequence: string;
    abbreviatedSequence: string;
    
    
    constructor(id:number, name: string,sequence:string,abbreviatedSequence: string) {
        super(id,name);
        this.sequence = sequence;
        this.abbreviatedSequence = abbreviatedSequence;
    }
}