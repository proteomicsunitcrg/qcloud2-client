import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Peptide } from '../models/peptide';

@Injectable()
export class IsotopologueService {

  constructor() { }

  private selectedPeptide = new Subject<Peptide>();
  selectedPeptide$ = this.selectedPeptide.asObservable();

  public sendPeptideToIsotopologueBuilder(peptide: Peptide): void {
    this.selectedPeptide.next(peptide);
  }

}
