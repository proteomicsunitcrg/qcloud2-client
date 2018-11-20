import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeptideService } from '../../../services/peptide.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { Peptide } from '../../../models/peptide';
import { Subscription } from 'rxjs';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { delay } from 'q';
declare var M: any;

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
    private sampleCompositionService: SampleCompositionService,
    private sampleTypeServce: SampleTypeService) { }

  peptides: Peptide[] = [];

  sampleTypes: SampleType[] = [];

  peptideFromDb$: Subscription;

  ngOnInit() {
    this.loadSampleTypes();
    this.loadPeptides('All');
    // Observing the incomming peptides from the form
    this. peptideFromDb$ = this.peptideService.peptideFromDb$
      .subscribe(
        (peptide) => {
          this.peptides = [];
          this.loadPeptides('All');
        });
  }

  private loadSampleTypes(): void {
    this.sampleTypeServce.getSamplesTypes()
      .subscribe(
        (sampleTypes) => {
          this.sampleTypes = sampleTypes;
        }, err => console.log(err),
        () => {
          delay(100).then(() => {
            this.enableSelect();
          });
        }
      );
  }

  private enableSelect(): void {
    const elem = document.getElementById('sampleTypeSelector');
    const instance = M.FormSelect.init(elem, {});
  }

  ngOnDestroy() {
    this.peptideFromDb$.unsubscribe();
  }

  /**
   * Get All peptides from the database and
   * where they are comming from
   * @param sampleTypeName the name of the sampletype
   */
  private loadPeptides(sampleTypeName: string): void {
    this.peptides = [];
    if (sampleTypeName === 'All') {
      this.peptideService.getAllPeptides()
      .subscribe((peptides) => {
        peptides.forEach(peptide => {
          // get the belongs
          peptide['belongs'] = null;
          this.getSampleType(peptide);
        });
      },
        error => console.log(error));
    } else {
      const sampleType = this.sampleTypes.find((st) => st.name === sampleTypeName);
      this.sampleCompositionService.getAllPeptidesBySampleType(sampleType)
        .subscribe(
          (peptides) => {
            peptides.forEach(peptide => {
              // get the belongs
              peptide['belongs'] = null;
              this.getSampleType(peptide);
            });
          }
        );
    }
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
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  /**
   * Sends the selected peptide to edit
   * @param peptide the peptide to edit(comming by the DOM)
   */
  sendToDetail(peptide: Peptide): void {
    this.peptideService.sendPeptide(peptide);
  }

  doFilter(sampleType: string): void {
    this.loadPeptides(sampleType);
  }

}
