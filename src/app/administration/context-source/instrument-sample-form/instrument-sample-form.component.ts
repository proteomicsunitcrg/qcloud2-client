import { Component, OnInit } from '@angular/core';
import { Peptide } from '../../../models/peptide';
import { ContextSourceService } from '../../../services/context-source.service';
import { InstrumentSample } from '../../../models/instrumentSample';
import { ContextSourceCategory } from '../../../models/contextSourceCategory';
import { delay } from 'q';
import { ContextSource } from '../../../models/contextSource';
import { Subscription } from 'rxjs/Subscription';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';

@Component({
  selector: 'app-instrument-sample-form',
  templateUrl: './instrument-sample-form.component.html',
  styleUrls: ['./instrument-sample-form.component.css']
})
export class InstrumentSampleFormComponent implements OnInit {

  constructor(private peptideService: ContextSourceService,
    private sampleTypeService: SampleTypeService) {
    
   }

  peptide: Peptide = new Peptide(null,'','','');
  instrumentSample: InstrumentSample= new InstrumentSample(null,'','');
  
  contextSource: ContextSource = new ContextSource(null,'');

  currentContextSourceCategory: ContextSourceCategory;

  
  ngOnInit() {
    this.currentContextSourceCategory = this.peptideService.getCurrentContextSourceCategory();
    this.peptideService.selectedContextSourceCategory$.subscribe(
      (action) => {
        this.currentContextSourceCategory = action;
      },
      (error) => {
        console.log(error);
      });
  }

  onSubmit(): void {
    // Check what kind of context source is and create the object properly
    let objectToSend: ContextSource;
    switch(this.currentContextSourceCategory.code) {
      case 'peptide' :
        objectToSend = this.peptide;
        objectToSend.name = this.contextSource.name;
        break;
      case 'isample' :
      objectToSend = this.instrumentSample;
      objectToSend.name = this.contextSource.name;
        break;
      default:
        console.log('submit error');
        break;
    }    
    
    this.peptideService.addContextSource(objectToSend,this.currentContextSourceCategory).subscribe(
      (result)=> {        
        // send to the list
        this.peptideService.sendNewContextSource(result);
      },
      (error) => {
        console.log(error);
      }
    )

  }
}
