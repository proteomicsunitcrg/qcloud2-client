import { Component, OnInit, OnDestroy } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';
import { SampleComposition } from '../../../models/sampleComposition';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { Peptide } from '../../../models/peptide';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sample-composition-form',
  templateUrl: './sample-composition-form.component.html',
  styleUrls: ['./sample-composition-form.component.css']
})
/**
 * This form is linked to the peptide-detail-form component
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
export class SampleCompositionFormComponent implements OnInit, OnDestroy {

  constructor(private sampleTypeService: SampleTypeService,
    private sampleCompositionService: SampleCompositionService) { }

  sampleTypes: SampleType[] = [];
  compositionInputs = {};
  compositions = [];

  currentPeptide$: Subscription;
  peptideSampleComposition$: Subscription;

  ngOnInit() {
    this.loadSampleTypes();
    /**
     * This subscription is used to manage the add/edit peptides
     */
    this.currentPeptide$ = this.sampleCompositionService.currentPeptide$
      .subscribe(
        (peptide) => {
          // fill the sample composition array and send back
          this.createSampleComponentArray(peptide);
          this.resetSampleCompositionForm();
        });
    /**
     * This subscription is used to manage the peptide edition,
     * it will manage the sample composition form fill
     */
    this.peptideSampleComposition$ = this.sampleCompositionService.peptideSampleComposition$
      .subscribe(
        (sampleCompositions) => {
          this.resetSampleCompositionForm();
          this.loadSampleComposition(sampleCompositions);
        }
      );
  }

  ngOnDestroy() {
    this.peptideSampleComposition$.unsubscribe();
    this.currentPeptide$.unsubscribe();
  }

  private resetSampleCompositionForm(): void {
    this.sampleTypes.forEach((s) => {
      this.compositionInputs[s.qualityControlControlledVocabulary] = false;
      this.compositions[s.qualityControlControlledVocabulary].concentration = null;
    });
  }

  private loadSampleComposition(sampleCompositions: SampleComposition[]): void {
    sampleCompositions.forEach(
      (sampleComposition) => {
        if (this.compositions.filter(
          c => c.qualityControlControlledVocabulary === sampleComposition.sampleType.qualityControlControlledVocabulary) !== undefined) {
          this.compositionInputs[sampleComposition.sampleType.qualityControlControlledVocabulary] = true;
          // tslint:disable-next-line:max-line-length
          this.compositions[sampleComposition.sampleType.qualityControlControlledVocabulary].concentration = sampleComposition.concentration;
        }
      }
    );
  }

  private createSampleComponentArray(peptide: Peptide): void {
    const sampleCompositions: SampleComposition[] = [];
    Object.keys(this.compositionInputs).forEach(
      (composition) => {
        if (this.compositionInputs[composition]) {
          const sampleComposition = new SampleComposition(peptide,
            this.compositions[composition].sampleType,
            this.compositions[composition].concentration);

          sampleCompositions.push(sampleComposition);
        }
      });
    this.sampleCompositionService.sendSampleComposition(sampleCompositions);
  }


  private loadSampleTypes(): void {
    this.sampleTypeService.getSamplesTypes()
      .subscribe(
        sampleTypes => {
          sampleTypes.forEach(sampleType => {
            this.sampleTypes.push(sampleType);
            this.compositions[sampleType.qualityControlControlledVocabulary] = new SampleComposition(null, sampleType, null);
            this.compositionInputs[sampleType.qualityControlControlledVocabulary] = false;
          });
        },
        error => console.log(error)
      );
  }

}
