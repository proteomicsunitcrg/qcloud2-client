import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeptideService } from '../../../services/peptide.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { Peptide } from '../../../models/peptide';
import { SampleComposition } from '../../../models/sampleComposition';
import { Subscription } from 'rxjs/Subscription';

/**
 * Peptide list component
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-peptides-list',
  templateUrl: './peptides-list.component.html',
  styleUrls: ['./peptides-list.component.css']
})
export class PeptidesListComponent implements OnInit, OnDestroy {

  constructor(private peptideService: PeptideService,
    private sampleCompositionService: SampleCompositionService) { }

  peptides = [];

  peptideFromDb$: Subscription;

  ngOnInit() {
    this.loadPeptides();
    // Observing the incomming peptides from the form
    this. peptideFromDb$ = this.peptideService.peptideFromDb$
      .subscribe(
        (peptide) => {
          this.peptides = [];
          this.loadPeptides();
        });
  }

  ngOnDestroy() {
    this.peptideFromDb$.unsubscribe();
  }

  /**
   * @deprecated check if it is not used anymore
   * @param peptide 
   */
  private isPeptideInList(peptide: Peptide): boolean {
    // Loop and look for the peptide
    if (this.peptides.find(p => p.id == peptide.id) == undefined) {
      return false;
    }
    return true;
  }

  /**
   * Get all peptides from the database and
   * where they are comming from
   */
  private loadPeptides(): void {
    this.peptides = [];
    this.peptideService.getAllPeptides()
      .subscribe((peptides) => {
        peptides.forEach(peptide => {
          // get the belongs
          peptide['belongs'] = null;
          this.getSampleType(peptide);
        })
      },
        error => console.log(error),
      ()=> console.log('end'));
  }
  /**
   * Set the peptide sample type
   * @param peptide the peptide to fill its belongs
   */
  private getSampleType(peptide: Peptide): void {
    let belongs = '';
    this.sampleCompositionService.getSampleCompositionByPeptide(peptide)
      .subscribe(
        (sampleCompositions) => {
          sampleCompositions.forEach(sampleComposition => {
            belongs = belongs + sampleComposition.sampleType.name + ', ';
          });
          peptide['belongs'] = belongs.slice(0, -2);
          this.peptides.push(peptide);
          this.peptides.sort(this.compare);
        },
        error => console.log(error));
  }

  private compare(a: Peptide, b: Peptide): number {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  /**
   * Sends the selected peptide to edit
   * @param peptide the peptide to edit(comming by the DOM)
   */
  sendToDetail(peptide: Peptide): void {
    this.peptideService.sendPeptide(peptide);
  }

}
