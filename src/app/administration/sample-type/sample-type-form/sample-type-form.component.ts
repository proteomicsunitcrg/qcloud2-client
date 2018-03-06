import { Component, OnInit } from '@angular/core';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';

@Component({
  selector: 'app-sample-type-form',
  templateUrl: './sample-type-form.component.html',
  styleUrls: ['./sample-type-form.component.css']
})
export class SampleTypeFormComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService) { }

  sampleType: SampleType = new SampleType(null,'');

  ngOnInit() {
  }

  onSubmit(): void {
    this.sampleTypeService.addSampleType(this.sampleType)
      .subscribe(
        (sampleType) => {
          this.sampleTypeService.sendNewSampleTypeToList(sampleType)
        },
        error => console.log(error)
      )
  }

}
