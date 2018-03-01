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
        this.loadPeptideIntoForm(peptide);
        delay(50).then(() => M.updateTextFields());
      });
    // Sample compositions observer
    this.sampleCompositionService.currentSampleComposition$.subscribe(
      (sampleCompositions) => {
        this.saveSampleCompositions(sampleCompositions);
      }, error => console.log(error)
    )
  }

  private loadPeptideIntoForm(peptide: Peptide) {
    this.peptideService.findPeptide(peptide).subscribe(
      (peptide) => {
        this.formData.currentPeptide = peptide;
        // Load sample composition if any
        this.sampleCompositionService.getSampleCompositionByPeptide(peptide)
          .subscribe(
            (sampleCompositions) => {
              this.sampleCompositionService.sendPeptideSampleComposition(sampleCompositions)
            },
            error => console.log(error)
          )
      },
      error => console.log(error)
    )
  }

  private saveSampleCompositions(sampleCompositions: SampleComposition[]): void {
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
  }

}

