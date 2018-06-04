import { Component, OnInit } from '@angular/core';
import { SampleTypeCategory } from '../../models/sampleTypeCategory';
import { SampleTypeCategoryService } from '../../services/sample-type-category.service';
import { ModalService } from '../../common/modal.service';
import { Modal } from '../../models/modal';
import { delay } from 'q';
declare var M: any;

@Component({
  selector: 'app-sample-type-category',
  templateUrl: './sample-type-category.component.html',
  styleUrls: ['./sample-type-category.component.css']
})
export class SampleTypeCategoryComponent implements OnInit {

  constructor(private sampleTypeCategoryService: SampleTypeCategoryService,
    private modalService: ModalService) { }

  sampleTypeCategories: SampleTypeCategory[] = [];

  sampleTypeCategory: SampleTypeCategory = new SampleTypeCategory(null, null, null, null);

  sampleComplexities: string[] = [];

  ngOnInit() {
    this.loadSampleTypeCategories();
    this.loadSampleTypeComplexities();
  }

  private loadSampleTypeCategories(): void {
    this.sampleTypeCategoryService.findAll()
      .subscribe((res) => {
        this.sampleTypeCategories = [];
        res.forEach(c => this.sampleTypeCategories.push(c));
      });
  }

  private loadSampleTypeComplexities(): void {
    this.sampleTypeCategoryService.findComplexities()
      .subscribe(
        (complexities) => {
          this.sampleComplexities = [];
          this.sampleComplexities = complexities;
        }, err => console.log(err),
        () => {
          delay(1).then(() => {
            this.enableSelects();

          });
        }
      );
  }

  onSubmit(): void {
    this.sampleTypeCategoryService.saveSampleTypeCategory(this.sampleTypeCategory)
      .subscribe((res) => {
        this.loadSampleTypeCategories();
      },
      (error) => {
        this.modalService.openModal(new Modal('Error', error.error.message, 'Ok', null, null, null));
      });
    }

    private enableSelects(): void {
      const elem = document.getElementById('select_complexity');
      const instance = M.FormSelect.init(elem, {});
    }
}
