import { Component, OnInit } from '@angular/core';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';

@Component({
  selector: 'app-sample-type-list',
  templateUrl: './sample-type-list.component.html',
  styleUrls: ['./sample-type-list.component.css']
})
export class SampleTypeListComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private sampleCompositionService: SampleCompositionService) { }

  sampleTypes: SampleType[] = [];

  ngOnInit() {
    // load sample types
    this.loadSampleTypes();
    this.sampleTypeService.newSampleType$
      .subscribe(sampleType => this.loadSampleTypes());
  }

  private addNewSampleTypeToList(sampleType: SampleType): void {
    
    this.sampleTypes.push(sampleType);
  }

  private loadSampleTypes(): void {
    this.sampleTypes = [];
    this.sampleTypeService.getSamplesTypes()
      .subscribe((sampleTypes) => {
        sampleTypes.forEach(sampleType=> this.sampleTypes.push(sampleType))
      },
      (error)=> console.log(error))
  }
  sendSampleType(sampleType: SampleType) {
    this.sampleCompositionService.sendSampleTypeToList(sampleType);
  }

}
