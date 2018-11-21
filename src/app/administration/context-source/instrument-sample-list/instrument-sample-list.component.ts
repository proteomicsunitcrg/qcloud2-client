import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { InstrumentSample } from '../../../models/instrumentSample';
import { Subscription } from 'rxjs';
declare var M: any;

@Component({
  selector: 'app-instrument-sample-list',
  templateUrl: './instrument-sample-list.component.html',
  styleUrls: ['./instrument-sample-list.component.css']
})
export class InstrumentSampleListComponent implements OnInit, OnDestroy {

  constructor(private isService: InstrumentSampleService) { }

  instrumentSamples: InstrumentSample[] = [];

  newInstrumentSample$: Subscription;

  ngOnInit() {
    this.loadInstrumentSamples();
    this.subscribeToNewInstrumentSample();
  }

  ngOnDestroy(): void {
    this.newInstrumentSample$.unsubscribe();
  }

  private subscribeToNewInstrumentSample(): void {
    this.newInstrumentSample$ = this.isService.newInstrumentSample$.subscribe(
      (instrumentSample) => {
        // this.instrumentSamples.push(instrumentSample);
        // check if already exists and substitute, if not, push it
        const index = this.instrumentSamples.findIndex((is) => is.apiKey === instrumentSample.apiKey);
        if (index === -1) {
          this.instrumentSamples.push(instrumentSample);
        } else {
          this.instrumentSamples[index] = instrumentSample;
        }
      }
    );
  }

  private loadInstrumentSamples(): void {
    this.isService.getAllInstrumentSample().subscribe(
      (instrumentSamples) => {
        instrumentSamples.forEach(instrumentSample => this.instrumentSamples.push(instrumentSample));
      }
    );
  }

  sendToDetail(instrumentSample: InstrumentSample): void {
    this.isService.sendInstrumentSampleToEdit(instrumentSample);
  }
}
