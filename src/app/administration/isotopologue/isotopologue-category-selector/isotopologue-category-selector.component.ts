import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';
import { delay } from 'q';
declare var M: any;

@Component({
  selector: 'app-isotopologue-category-selector',
  templateUrl: './isotopologue-category-selector.component.html',
  styleUrls: ['./isotopologue-category-selector.component.css']
})
export class IsotopologueCategorySelectorComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService) { }

  @Output() selectedSampleType = new EventEmitter<SampleType>();

  /**
   * Only the complex sample types with isotopologues
   * will be showed
   */
  isotopologueSampleType: SampleType[] = [];

  isoSampleType: SampleType;

  ngOnInit() {
    this.loadIsotopologueSampleTypes();
  }

  private loadIsotopologueSampleTypes(): void {
    this.sampleTypeService.getIsotopologueSampleTypes()
      .subscribe(
        (sampleTypes) => {
          this.isotopologueSampleType = [];
          this.isotopologueSampleType = sampleTypes;
        },
        err => console.log(err),
        () => {
          delay(100).then(() => this.enableSelect());
        }
      );
  }

  private enableSelect(): void {
    const elem = document.getElementById('select_sample_types');
    const instance = M.FormSelect.init(elem, {});
  }

  onChange(): void {
    this.selectedSampleType.emit(this.isoSampleType);
  }

}
