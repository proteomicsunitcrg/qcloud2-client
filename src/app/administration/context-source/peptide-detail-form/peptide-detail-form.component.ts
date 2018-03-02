import { Component, OnInit } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { Peptide } from '../../../models/peptide';
import { SampleComposition } from '../../../models/sampleComposition';
import { SampleType } from '../../../models/sampleType';
import { PeptideService } from '../../../services/peptide.service';
import * as M from 'materialize-css/dist/js/materialize';
import { delay } from 'q';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';

@Component({
  selector: 'app-peptide-detail-form',
  templateUrl: './peptide-detail-form.component.html',
  styleUrls: ['./peptide-detail-form.component.css']
})
export class PeptideDetailFormComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private peptideService: PeptideService,
    private sampleCompositionService: SampleCompositionService,
    private modalService: ModalService) { }

  sampleTypes: SampleType[] = [];

  previousSampleCompositions: SampleComposition[] = [];

  formTitle = 'New peptide';
  formSubmitButton = 'Add new peptide';

  formData = {
    currentPeptide: new Peptide(null, '', '', ''),
  }

  compositionInputs = {};

  ngOnInit() {
    this.peptideService.selectedPeptide$.subscribe(
      (peptide) => {
        this.loadPeptideIntoForm(peptide);
        this.formTitle = 'Edit peptide';
        this.formSubmitButton = 'Update peptide';
        delay(50).then(() => M.updateTextFields());
      });
    // Sample compositions observer
    this.sampleCompositionService.currentSampleComposition$.subscribe(
      (sampleCompositions) => {
        this.saveSampleCompositions(sampleCompositions);
      }, error => console.log(error));

    this.sampleTypeService.getSamplesTypes().subscribe(
      (sampleTypes) => this.sampleTypes = sampleTypes
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
              this.sampleCompositionService.sendPeptideSampleComposition(sampleCompositions);
              this.previousSampleCompositions = sampleCompositions;
            },
            error => console.log(error)
          )
      },
      error => console.log(error)
    )
  }

  private saveSampleCompositions(sampleCompositions: SampleComposition[]): void {
    // Compare with previous sample types
    this.sampleTypes.forEach((sampleType) => {
      this.checkSampleComposition(sampleType, sampleCompositions);

    });


  }

  private checkSampleComposition(sampleType: SampleType, sampleCompositions: SampleComposition[]): void {
    let found = false;
    sampleCompositions.forEach(
      (sampleComposition) => {
        if (sampleComposition.sampleType.id == sampleType.id) {
          found = true;
          this.saveSampleComposition(sampleComposition);
        }
      }
    )
    if (!found) {
      // check if it is in the previous array in order to delete
      this.checkInPreviousArray(sampleType);
    }
  }

  private saveSampleComposition(sampleComposition: SampleComposition): void {
    this.sampleCompositionService.saveSampleComposition(sampleComposition).subscribe(
      (result) => {
        // this.peptideService.sendPeptideToList(result.peptide);        
      },
      error => console.log(error)
    )
  }

  private checkInPreviousArray(sampleType: SampleType): void {
    this.previousSampleCompositions.forEach(
      (sc) => {
        if (sc.sampleType.id == sampleType.id) {
          this.deleteSampleComposition(sc);
        }
      }
    )
  }

  deleteSampleComposition(sampleComposition: SampleComposition): void {
    this.sampleCompositionService.deleteSampleComposiion(sampleComposition).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    // Save the peptide
    if (this.formTitle === 'New peptide') {
      this.peptideService.savePeptide(this.formData.currentPeptide)
        .subscribe(
          (result) => {
            this.peptideService.sendPeptideToList(result);
            // If is ok, then grab de sample composition and send to the server
            this.sampleCompositionService.sendPeptide(result);
          },
          (error) => {
            this.modalService.openModal(new Modal(error.error.error,
              error.error.message, 'Ok', '', 'newPeptide', null));
          }
        );
    } else {
      this.peptideService.updatePeptide(this.formData.currentPeptide)
        .subscribe(
          (result) => {
            this.peptideService.sendPeptideToList(result);
            // If is ok, then grab de sample composition and send to the server
            this.sampleCompositionService.sendPeptide(result);
          },
          (error) => {
            this.modalService.openModal(new Modal(error.error.error,
              error.error.message, 'Ok', '', 'updatePeptide', null));
          }
        )
    }
    this.formTitle = 'New peptide';
    this.formSubmitButton = 'Add new peptide';


  }


}

