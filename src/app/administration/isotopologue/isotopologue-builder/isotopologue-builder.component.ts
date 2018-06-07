import { Component, OnInit, OnDestroy } from '@angular/core';
import { IsotopologueService } from '../../../services/isotopologue.service';
import { Subscription } from 'rxjs/Subscription';
import { Peptide } from '../../../models/peptide';
import { Isotopologue } from '../../../models/isotopologue';

@Component({
  selector: 'app-isotopologue-builder',
  templateUrl: './isotopologue-builder.component.html',
  styleUrls: ['./isotopologue-builder.component.css']
})
/**
 * Main class for generate new isotopologues of a given peptide
 * @author Daniel Mancera
 */
export class IsotopologueBuilderComponent implements OnInit, OnDestroy {

  constructor(private isotopologueService: IsotopologueService) { }

  selectedPeptide$: Subscription;

  peptide: Peptide;

  newIsotopologue = false;

  isotopologues: Isotopologue[];

  isotopologue: Isotopologue = new Isotopologue(null, null, null, null, null, null, null, null);

  ngOnInit() {
    this.subscribeToPeptide();
  }

  private subscribeToPeptide(): void {
    this.selectedPeptide$ = this.isotopologueService.selectedPeptide$
      .subscribe(
        (peptide) => {
          this.newIsotopologue = false;
          this.peptide = peptide;
          // load isotopologues
          this.isotopologueService.getIsotopologuesByMainPeptide(peptide)
            .subscribe(
              (isotopologues) => {
                this.isotopologues = isotopologues;
              }
            );
        }
      );
  }

  addIsotopologue(): void {
    this.newIsotopologue = true;
    this.isotopologue = new Isotopologue(null, null, null, null, null, null, null, null);
  }


  ngOnDestroy() {
    this.selectedPeptide$.unsubscribe();
  }

}
