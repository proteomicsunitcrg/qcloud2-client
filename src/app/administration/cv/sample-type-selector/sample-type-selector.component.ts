import { Component, OnInit, Input } from '@angular/core';
import { CV } from '../../../models/cv';
import { SampleTypeCategory } from '../../../models/sampleTypeCategory';
import { delay } from 'q';
import { SampleType } from '../../../models/sampleType';
import { CvService } from '../../../services/cv.service';
declare var M: any;

@Component({
  selector: 'app-sample-type-selector',
  templateUrl: './sample-type-selector.component.html',
  styleUrls: ['./sample-type-selector.component.css']
})
export class SampleTypeSelectorComponent implements OnInit {

  @Input() sampleTypeCategory: SampleTypeCategory;

  @Input() cv: CV;

  isDefault = true;

  selectedSampleType: SampleType;

  constructor(private instrumentService: CvService) { }

  ngOnInit() {
    this.setSelectedSampleType();
    delay(100).then(
      () => {
        this.enableSelect();
      }
    );
  }

  private setSelectedSampleType(): void {
    if (this.cv.sampleTypes.length > 0) {
      this.selectedSampleType = this.getUserDefinedSampleType();
    } else {
      this.selectedSampleType = this.getMainSampleType();
    }
  }

  private getUserDefinedSampleType(): SampleType {
    let selectedSampleType = null;
    this.sampleTypeCategory.sampleTypes.forEach(
      (sampleTypeCategorySampleType) => {
        const sampleType = this.cv.sampleTypes.find((s) => {
          return s.qualityControlControlledVocabulary === sampleTypeCategorySampleType.qualityControlControlledVocabulary;
        });
        if (sampleType !== undefined) {
          this.isDefault = false;
          selectedSampleType = this.sampleTypeCategory.sampleTypes.find((stc) => {
            return stc.qualityControlControlledVocabulary === sampleType.qualityControlControlledVocabulary;
          });
        } else {
          selectedSampleType = this.getMainSampleType();
        }
      }
    );
    return selectedSampleType;
  }

  private getMainSampleType(): SampleType {
    return this.sampleTypeCategory.sampleTypes.find(st => st.mainSampleType);
  }

  private enableSelect(): void {
    const elem = document.getElementById('st-selector-' + this.cv.cvid + '-' + this.sampleTypeCategory.apiKey);
    M.FormSelect.init(elem, {});
  }

  updateSampleType(): void {
    this.instrumentService.addSampleTypeToCv(this.cv.cvid, this.selectedSampleType)
      .subscribe(
        (res) => {
          M.toast({ html: 'Sample type saved!' });
        }, err => {
          M.toast({ html: 'Error saving sample type!' });
        }
      );
  }

}

