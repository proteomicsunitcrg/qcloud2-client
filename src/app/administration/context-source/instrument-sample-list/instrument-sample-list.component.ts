import { Component, OnInit } from '@angular/core';
import { ContextSourceService } from '../../../services/context-source.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { ContextSourceCategory } from '../../../models/contextSourceCategory';
import { ContextSource } from '../../../models/contextSource';
import * as M from 'materialize-css/dist/js/materialize';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';

@Component({
  selector: 'app-instrument-sample-list',
  templateUrl: './instrument-sample-list.component.html',
  styleUrls: ['./instrument-sample-list.component.css']
})
export class InstrumentSampleListComponent implements OnInit {

  constructor(private isService: InstrumentSampleService) { }

  currentContextCategory: ContextSourceCategory;

  instrumentSamples= [];

  ngOnInit() {
    this.loadInstrumentSamples();
  }

  private loadInstrumentSamples() : void {
    this.isService.getAllInstrumentSample().subscribe(
      (instrumentSamples) => {
        instrumentSamples.forEach(instrumentSample => this.instrumentSamples.push(instrumentSample));
      }
    )
  }
  

}
