import { Component, OnInit } from '@angular/core';
import { Peptide } from '../../../models/peptide';
import { InstrumentSample } from '../../../models/instrumentSample';
import { ContextSource } from '../../../models/contextSource';
import { SampleTypeService } from '../../../services/sample-type.service';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';

@Component({
  selector: 'app-instrument-sample-form',
  templateUrl: './instrument-sample-form.component.html',
  styleUrls: ['./instrument-sample-form.component.css']
})
export class InstrumentSampleFormComponent implements OnInit {

  constructor(private instrumentSampleService: InstrumentSampleService,
    private sampleTypeService: SampleTypeService) {

  }

  peptide: Peptide = new Peptide(null, '', '', null, null, null, null);
  instrumentSample: InstrumentSample = new InstrumentSample(null, '', '', null, null);

  contextSource: ContextSource = new ContextSource(null, '', '', null);



  ngOnInit() {

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
}
