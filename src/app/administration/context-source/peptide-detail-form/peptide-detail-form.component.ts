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
      });
    // Sample compositions observer
    this.sampleCompositionService.currentSampleComposition$.subscribe(
      (sampleCompositions) => {
        this.saveSampleCompositions(sampleCompositions);
      }, error => console.log(error)
    )
  }

  private saveSampleCompositions(sampleCompositions: SampleComposition[]) : void {
    sampleCompositions.forEach((sampleComposition) => {
      this.sampleCompositionService.saveSampleComposition(sampleComposition)
        .subscribe((result) => {
          console.log(result);
        },
          (error) => {
            console.log(error);
          })
    });
  }

  onSubmit(): void {
    // Save the peptide
    this.peptideService.savePeptide(this.formData.currentPeptide)
      .subscribe(
        (result) => {
          this.peptideService.sendPeptideToList(result);
          // If is ok, then grab de sample composition and send to the server
          this.sampleCompositionService.sendPeptide(result);
        },
        error => console.log(error)
      );

    // Save the sample composition

  }

}

