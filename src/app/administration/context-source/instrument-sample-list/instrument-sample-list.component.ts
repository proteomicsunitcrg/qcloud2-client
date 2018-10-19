import { Component, OnInit } from '@angular/core';
import { ContextSourceCategory } from '../../../models/contextSourceCategory';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { InstrumentSample } from '../../../models/instrumentSample';
declare var M: any;

@Component({
  selector: 'app-instrument-sample-list',
  templateUrl: './instrument-sample-list.component.html',
  styleUrls: ['./instrument-sample-list.component.css']
})
export class InstrumentSampleListComponent implements OnInit {

  constructor(private isService: InstrumentSampleService) { }

  currentContextCategory: ContextSourceCategory;

  instrumentSamples = [];

  ngOnInit() {
    this.loadInstrumentSamples();
    // Observe for new instrument samples
    this.isService.newInstrumentSample$.subscribe(
      (instrumentSample) => {
        this.instrumentSamples.push(instrumentSample);
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
