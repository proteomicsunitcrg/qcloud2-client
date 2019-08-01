import { Component, OnInit } from '@angular/core';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleTypeCategory } from '../../../models/sampleTypeCategory';
import { SampleTypeCategoryService } from '../../../services/sample-type-category.service';
import { delay } from 'q';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
declare var M: any;

@Component({
  selector: 'app-sample-type-form',
  templateUrl: './sample-type-form.component.html',
  styleUrls: ['./sample-type-form.component.css']
})
export class SampleTypeFormComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private sampleTypeCategoryService: SampleTypeCategoryService,
    private modalService: ModalService) { }

  sampleType: SampleType = new SampleType(null, '', null, null, '');

  sampleTypeCategories: SampleTypeCategory[] = [];

  ngOnInit() {
    this.loadSampleTypeCategories();
  }

  private loadSampleTypeCategories(): void {
    this.sampleTypeCategoryService.findAll()
      .subscribe((res) => {
        this.sampleTypeCategories = [];
        res.forEach(c => this.sampleTypeCategories.push(c));
      }, error => console.log(error),
        () => {
          delay(1).then(() => this.enableSelect());
        });
  }


  onSubmit(): void {
    this.sampleTypeService.addSampleType(this.sampleType)
      .subscribe(
        (sampleType) => {
          this.sampleTypeService.sendNewSampleTypeToList(sampleType);
        },
        error => {
          this.modalService.openModal(new Modal('Error', error.error.message, 'Ok', null, null, null));
        }
      );
  }

  private enableSelect() {
    const elem = document.getElementById('select_categories');
    const instance = M.FormSelect.init(elem, {});
  }

}
