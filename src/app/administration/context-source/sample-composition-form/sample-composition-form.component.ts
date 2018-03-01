import { Component, OnInit } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';
import { SampleComposition } from '../../../models/sampleComposition';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { Peptide } from '../../../models/peptide';

@Component({
  selector: 'app-sample-composition-form',
  templateUrl: './sample-composition-form.component.html',
  styleUrls: ['./sample-composition-form.component.css']
})
/**
 * This form is linked to the peptide-detail-form component
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
export class SampleCompositionFormComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private sampleCompositionService: SampleCompositionService) { }

  sampleTypes: SampleType[] = [];
  compositionInputs = {};
  compositions = [];

  ngOnInit() {
    this.loadSampleTypes();
    this.sampleCompositionService.currentPeptide$.subscribe(
      (peptide) => {
        // fill the sample composition array and send back
        this.createSampleComponentArray(peptide);
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
