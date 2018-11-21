import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstrumentSample } from '../../../models/instrumentSample';
import { ContextSource } from '../../../models/contextSource';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { Subscription } from 'rxjs';
import { delay } from 'q';
import { TraceColor } from '../../../models/TraceColor';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../..//models/modal';
declare var M: any;

@Component({
  selector: 'app-instrument-sample-form',
  templateUrl: './instrument-sample-form.component.html',
  styleUrls: ['./instrument-sample-form.component.css']
})
export class InstrumentSampleFormComponent implements OnInit, OnDestroy {

  constructor(private instrumentSampleService: InstrumentSampleService,
      private modalService: ModalService) {
  }

  instrumentSample: InstrumentSample = new InstrumentSample(null, '', '', null, null, new TraceColor('rgb(51, 102, 204)', null), 0);

  contextSource: ContextSource = new ContextSource(null, '', '', null, null, null);

  selectedInstrumentSample$: Subscription;

  formSubmitButton = 'Add new instrument sample';

  ngOnDestroy() {
    this.selectedInstrumentSample$.unsubscribe();
  }

  ngOnInit() {
    this.subscribeToSelectedInstrumentSample();
  }

  onSubmit(): void {
    if (this.formSubmitButton === 'Add new instrument sample') {
      this.instrumentSampleService.addNewInstrumentSample(this.instrumentSample).subscribe(
        (result) => {
          this.instrumentSampleService.sendInstrumentSampleToList(result);
        },
        (error) => this.modalService.openModal(new Modal('Error', error.error.message, 'Ok', null, 'saveInstrumentSample', null))
      );
    } else {
      this.instrumentSampleService.updateInstrumentSample(this.instrumentSample).subscribe(
        (result) => {
          this.instrumentSampleService.sendInstrumentSampleToList(result);
        },
        (error) => {
          this.modalService.openModal(new Modal('Error', error.error.message, 'Ok', null, 'updateInstrumentSample', null));
        }
      );
    }
  }

  private subscribeToSelectedInstrumentSample(): void {
    this.selectedInstrumentSample$ = this.instrumentSampleService
      .selectedInstrumentSample$.subscribe(
        (instrumentSample) => {
          this.loadSelectedInstrumentSample(instrumentSample);
        }
      );
  }

  private loadSelectedInstrumentSample(instrumentSample: InstrumentSample): void {
    this.instrumentSample = instrumentSample;
    this.contextSource.name = instrumentSample.name;
    this.formSubmitButton = 'Update instrument sample';
    delay(50).then(() => M.updateTextFields());

  }

  resetForm(): void {
    this.instrumentSample = new InstrumentSample(null, '', '', null, null, new TraceColor('rgb(51, 102, 204)', null), 0);
    this.formSubmitButton = 'Add new instrument sample';
  }

}
