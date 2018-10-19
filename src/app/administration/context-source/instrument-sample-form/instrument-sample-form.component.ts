import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Peptide } from '../../../models/peptide';
import { InstrumentSample } from '../../../models/instrumentSample';
import { ContextSource } from '../../../models/contextSource';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { Subscription } from 'rxjs';
import { delay } from 'q';
declare var M: any;

@Component({
  selector: 'app-instrument-sample-form',
  templateUrl: './instrument-sample-form.component.html',
  styleUrls: ['./instrument-sample-form.component.css']
})
export class InstrumentSampleFormComponent implements OnInit, OnDestroy {

  constructor(private instrumentSampleService: InstrumentSampleService) {
  }

  peptide: Peptide = new Peptide(null, '', '', null, null, null, null);
  instrumentSample: InstrumentSample = new InstrumentSample(null, '', '', null, null);

  contextSource: ContextSource = new ContextSource(null, '', '', null);

  selectedInstrumentSample$: Subscription;

  ngOnDestroy() {
    this.selectedInstrumentSample$.unsubscribe();
  }

  ngOnInit() {
    this.subscribeToSelectedInstrumentSample();
  }

  onSubmit(): void {
    // Check what kind of context source is and create the object properly
    let objectToSend: ContextSource;
    objectToSend = this.instrumentSample;
    objectToSend.name = this.contextSource.name;

    this.instrumentSampleService.addNewInstrumentSample(objectToSend).subscribe(
      (result) => {
        this.instrumentSampleService.sendInstrumentSampleToList(result);
      },
      (error) => console.log(error)
    );
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
    delay(50).then(() => M.updateTextFields());

  }

}
