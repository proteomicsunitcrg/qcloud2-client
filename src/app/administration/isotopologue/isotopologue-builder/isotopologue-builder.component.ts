import { Component, OnInit, OnDestroy } from '@angular/core';
import { IsotopologueService } from '../../../services/isotopologue.service';
import { Subscription } from 'rxjs/Subscription';
import { Peptide } from '../../../models/peptide';

@Component({
  selector: 'app-isotopologue-builder',
  templateUrl: './isotopologue-builder.component.html',
  styleUrls: ['./isotopologue-builder.component.css']
})
export class IsotopologueBuilderComponent implements OnInit, OnDestroy {

  constructor(private isotopologueService: IsotopologueService) { }

  selectedPeptide$: Subscription;

  peptide: Peptide;

  ngOnInit() {
    this.subscribeToPeptide();
  }

  private subscribeToPeptide(): void {
    this.selectedPeptide$ = this.isotopologueService.selectedPeptide$
      .subscribe(
        (peptide) => {
          this.peptide = peptide;
        }
      );
  }


  ngOnDestroy() {
    this.selectedPeptide$.unsubscribe();
  }

}
