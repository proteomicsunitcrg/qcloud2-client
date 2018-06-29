import { Component, OnInit } from '@angular/core';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { SampleTypeCategoryService } from '../../../services/sample-type-category.service';
import { SampleTypeCategory } from '../../../models/sampleTypeCategory';

@Component({
  selector: 'app-sample-type-list',
  templateUrl: './sample-type-list.component.html',
  styleUrls: ['./sample-type-list.component.css']
})
export class SampleTypeListComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private sampleCompositionService: SampleCompositionService,
    private sampleTypeCategoryService: SampleTypeCategoryService) { }

  sampleTypes: SampleType[] = [];

  sampleTypeCategories: SampleTypeCategory[] = [];

  ngOnInit() {
    // load sample types
    this.loadSampleTypeCategories();
  }

  private loadSampleTypeCategories(): void {
    this.sampleTypeCategoryService.findAll()
      .subscribe(
        (categories) => {
          this.sampleTypeCategories = categories;
        }
      );
  }

  sendSampleType(sampleType: SampleType) {
    this.sampleCompositionService.sendSampleTypeToList(sampleType);
  }

  doMakeDefault(sampleTypeCategory: SampleTypeCategory, sampleType: SampleType): void {
    this.sampleTypeService.makeMainSampleType(sampleTypeCategory.apiKey, sampleType.qualityControlControlledVocabulary)
      .subscribe(
        () => {
          this.loadSampleTypeCategories();
        },
        err => console.log(err)
      );
  }

}
