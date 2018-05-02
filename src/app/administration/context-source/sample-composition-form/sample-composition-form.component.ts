import { Component, OnInit, OnDestroy } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';
import { SampleComposition } from '../../../models/sampleComposition';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { Peptide } from '../../../models/peptide';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sample-composition-form',
  templateUrl: './sample-composition-form.component.html',
  styleUrls: ['./sample-composition-form.component.css']
})
/**
 * This form is linked to the peptide-detail-form component
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
export class SampleCompositionFormComponent implements OnInit, OnDestroy{

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
    this. currentPeptide$ = this.sampleCompositionService.currentPeptide$
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
    )
  }

  ngOnDestroy() {
    this.peptideSampleComposition$.unsubscribe();
    this.currentPeptide$.unsubscribe();
  }

  private resetSampleCompositionForm(): void {
    this.sampleTypes.forEach((s) => {
      this.compositionInputs[s.id]=false;
      this.compositions[s.id].concentration = null;
    });
  }

  private loadSampleComposition(sampleCompositions: SampleComposition[]): void {
    sampleCompositions.forEach(
      (sampleComposition) => {
        if(this.compositions.filter(c => c.id== sampleComposition.sampleType.id)!=undefined) {
          this.compositionInputs[sampleComposition.sampleType.id] = true;
          this.compositions[sampleComposition.sampleType.id].concentration = sampleComposition.concentration;
        }
      }
    )
  }

  private createSampleComponentArray(peptide: Peptide): void {
    let sampleCompositions: SampleComposition[] = [];
    Object.keys(this.compositionInputs).forEach(
      (composition) => {
        if(this.compositionInputs[composition]) {          
          let sampleComposition = new SampleComposition(peptide, this.compositions[composition].sampleType,this.compositions[composition].concentration);
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
            this.compositions[sampleType.id] = new SampleComposition(null,sampleType,null);
            this.compositionInputs[sampleType.id] = false;          
          });
        },
        error => console.log(error)
      );
  }

}
