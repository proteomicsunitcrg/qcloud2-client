import { Component, OnInit, OnDestroy } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { Peptide } from '../../../models/peptide';
import { SampleComposition } from '../../../models/sampleComposition';
import { SampleType } from '../../../models/sampleType';
import { PeptideService } from '../../../services/peptide.service';
import { delay } from 'q';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
import { Subscription } from 'rxjs';
import { TraceColor } from '../../../models/TraceColor';
import { TraceColorService } from '../../../services/trace-color.service';

declare var M: any;
/**
 * Peptide form component
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-peptide-detail-form',
  templateUrl: './peptide-detail-form.component.html',
  styleUrls: ['./peptide-detail-form.component.css']
})
export class PeptideDetailFormComponent implements OnInit, OnDestroy {

  constructor(private sampleTypeService: SampleTypeService,
    private peptideService: PeptideService,
    private sampleCompositionService: SampleCompositionService,
    private modalService: ModalService,
    private traceColorService: TraceColorService) { }

  sampleTypes: SampleType[] = [];

  traceColors: TraceColor[] = [];

  previousSampleCompositions: SampleComposition[] = [];

  collapsibleInstance: any;

  formTitle = 'New peptide';
  formSubmitButton = 'Add new peptide';

  selectedPeptide$: Subscription;
  currentSampleComposition$: Subscription;

  formData = {
    currentPeptide: new Peptide(null, '', '', '', null, null, null, new TraceColor('rgb(51, 102, 204)', null), 0),
  };

  compositionInputs = {};

  ngOnInit() {
    this.subscribeToSelectedPeptide();
    this.subscribeToCurrentSampleComposition();
    this.getSampleTypes();
  }

  private getSampleTypes(): void {
    this.sampleTypeService.getSamplesTypes()
      .subscribe(
        (sampleTypes) => this.sampleTypes = sampleTypes
      );
  }

  private subscribeToCurrentSampleComposition(): void {
    // Sample compositions observer
    this.currentSampleComposition$ = this.sampleCompositionService.currentSampleComposition$
      .subscribe(
        (sampleCompositions) => {
          this.saveSampleCompositions(sampleCompositions);
        }, error => console.log(error));
  }

  private subscribeToSelectedPeptide(): void {
    this.selectedPeptide$ = this.peptideService.selectedPeptide$
      .subscribe(
        (peptide) => {
          this.loadPeptideIntoForm(peptide);
          this.formTitle = 'Edit peptide';
          this.formSubmitButton = 'Update peptide';
        }, error => console.log(error));
  }

  ngOnDestroy() {
    this.selectedPeptide$.unsubscribe();
    this.currentSampleComposition$.unsubscribe();
  }

  /**
   * Load a selected peptide
   * @param peptide the peptide to load
   */
  private loadPeptideIntoForm(peptide: Peptide) {
    this.formData.currentPeptide = peptide;
    this.sampleCompositionService.getSampleCompositionByPeptide(peptide)
      .subscribe(
        (sampleCompositions) => {
          this.sampleCompositionService.sendPeptideSampleComposition(sampleCompositions);
          this.previousSampleCompositions = sampleCompositions;
        },
        error => console.log(error)
      );
    delay(50).then(() => M.updateTextFields());
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
        if (sampleComposition.sampleType.qualityControlControlledVocabulary === sampleType.qualityControlControlledVocabulary) {
          found = true;
          this.saveSampleComposition(sampleComposition);
        }
      }
    );
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
    );
  }

  private checkInPreviousArray(sampleType: SampleType): void {
    this.previousSampleCompositions.forEach(
      (sc) => {
        if (sc.sampleType.qualityControlControlledVocabulary === sampleType.qualityControlControlledVocabulary) {
          this.deleteSampleComposition(sc);
        }
      }
    );
  }

  deleteSampleComposition(sampleComposition: SampleComposition): void {
    this.sampleCompositionService.deleteSampleComposiion(sampleComposition).subscribe(
      (result) => {

      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    // close color picker
    this.collapsibleInstance.close(0);
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
          (peptide) => {
            this.peptideService.sendPeptideToList(peptide);
            this.sampleCompositionService.sendPeptide(peptide);
          }
        );
    }
    this.formTitle = 'New peptide';
    this.formSubmitButton = 'Add new peptide';
    this.formData.currentPeptide = new Peptide(null, '', '', '', null, null, null, new TraceColor('rgb(51, 102, 204)', null), null);
  }

}

