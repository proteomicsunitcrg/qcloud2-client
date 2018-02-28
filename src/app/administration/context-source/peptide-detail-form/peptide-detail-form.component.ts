import { Component, OnInit } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { Peptide } from '../../../models/peptide';
import { SampleComposition } from '../../../models/sampleComposition';
import { SampleType } from '../../../models/sampleType';
import { PeptideService } from '../../../services/peptide.service';
import * as M from 'materialize-css/dist/js/materialize';
import { delay } from 'q';
import { SampleCompositionService } from '../../../services/sample-composition.service';

@Component({
  selector: 'app-peptide-detail-form',
  templateUrl: './peptide-detail-form.component.html',
  styleUrls: ['./peptide-detail-form.component.css']
})
export class PeptideDetailFormComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private peptideService: PeptideService,
    private sampleCompositionService: SampleCompositionService) { }

  sampleTypes: SampleType[] = [];


  formData = {
    currentPeptide: new Peptide(null, '', '', ''),
  }

  compositionInputs = {};

  ngOnInit() {
    this.peptideService.selectedPeptide$.subscribe(
      (peptide) => {
        // this.formData.currentPeptide = this.peptideService.findPeptide(peptide);
        this.peptideService.findPeptide(peptide).subscribe(
          (peptide) => {
            this.formData.currentPeptide = peptide;
          },
          error => console.log(error)
        )
        delay(50).then(() => M.updateTextFields());
      }
    )
  }

  grab(): void {
    // send the peptide to the sample composition component
    this.sampleCompositionService.sendPeptide(this.formData.currentPeptide);
  }

  show(): void {
    console.log(this.compositionInputs);
    Object.keys(this.compositionInputs).forEach(
      (composition) => {
        if (this.compositionInputs[composition]) {
          // let sampleComposition = new SampleComposition(this.formData.currentPeptide, this.formData.compositions[composition].sampleType,this.formData.compositions[composition].concentration);
        }
      }
    )
  }

  onSubmit(): void {
    // Save the peptide
    this.peptideService.savePeptide(this.formData.currentPeptide)
      .subscribe(
        (result) => {
          this.peptideService.sendPeptideToList(result);
        },
        error => console.log(error)
      );

    // Save the sample composition

  }

}

