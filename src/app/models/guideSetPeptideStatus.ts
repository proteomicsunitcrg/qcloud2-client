import { Param } from './param';
import { Peptide } from './peptide';

export class GuideSetPeptideStatus {
    param: Param;
    peptide: Peptide;
    status: string;
    count: number;

    constructor(param: Param, peptide: Peptide, status: string, count: number) {
        this.param = param;
        this.peptide = peptide;
        this.status = status;
        this.count = count;
    }
}
