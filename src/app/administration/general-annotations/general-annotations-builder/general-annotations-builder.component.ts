import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { GeneralAnnotation } from '../../../models/GeneralAnnotation';
import { GeneralAnnotationService } from '../../../services/general-annotation-service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../shared/ToastConfig';
declare let M: any;
@Component({
  selector: 'app-general-annotations-builder',
  templateUrl: './general-annotations-builder.component.html',
  styleUrls: ['./general-annotations-builder.component.css']
})
export class GeneralAnnotationsBuilderComponent implements OnInit {

  constructor(private generalAnnotationService: GeneralAnnotationService,
    private toastr: ToastrService) { }

  annotationForm = new FormGroup({
    desc: new FormControl('Description', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    day: new FormControl(new Date().getDate(), [
      Validators.required,
      Validators.min(1),
      Validators.max(31)
    ]),
    month: new FormControl(new Date().getMonth() + 1, [
      Validators.required,
      Validators.min(1),
      Validators.max(12)
    ]),
    year: new FormControl(new Date().getFullYear(), [
      Validators.required,
      Validators.min(1970),
      Validators.max(new Date().getFullYear())
    ]),
    hour: new FormControl(new Date().getHours(), [
      Validators.required,
      Validators.min(0),
      Validators.max(23)
    ]),
    minute: new FormControl(new Date().getMinutes(), [
      Validators.required,
      Validators.min(0),
      Validators.max(59)
    ]),
  });

  generalAno: GeneralAnnotation;
  @Input() dataFromParent: string;
  @Output() closeForm: EventEmitter<String> = new EventEmitter<String>();

  updateMode = false;

  ngOnInit() {
    this.isEdit();
    if (this.updateMode) {
      this.getAnnotation();
    }
    M.AutoInit();
  }
  private getAnnotation(): void {
    this.generalAnnotationService.getGeneralAnnotationById(+this.dataFromParent).subscribe(
      res => this.mountForm(res),
      err => console.error(err)
    );
  }

  private mountForm(annotation: GeneralAnnotation): void {
    this.generalAno = annotation;
    this.annotationForm.controls.desc.setValue(annotation.description);
    const date = new Date(annotation.date);
    this.annotationForm.controls.year.setValue(date.getFullYear());
    this.annotationForm.controls.month.setValue(date.getMonth());
    this.annotationForm.controls.day.setValue(date.getDate());
    this.annotationForm.controls.hour.setValue(date.getHours());
    this.annotationForm.controls.minute.setValue(date.getMinutes());
  }

  private isEdit(): void {
    if (this.dataFromParent !== 'noEdit') {
      this.updateMode = true;
    }
  }

  public submit() {
    const date = `${this.annotationForm.value.year}-${this.annotationForm.value.month}-${this.annotationForm.value.day}\
    ${this.annotationForm.value.hour}:${this.annotationForm.value.minute}`;
    const annotation = new GeneralAnnotation(null, null, date, this.annotationForm.value.desc, true);
    
    if (this.updateMode) {
      annotation.id = this.generalAno.id;
    }
    this.generalAnnotationService.saveGeneralAnnotation(annotation).subscribe(
      () => {
        this.toastr.success('General annotation saved', null, TOASTSETTING);
        this.closeFormEvent();
      },
      () => this.toastr.error('Error saving the annotation', null, TOASTSETTING)
    );
  }

  public closeFormEvent(): void {
    this.closeForm.emit('emit');
  }

}
