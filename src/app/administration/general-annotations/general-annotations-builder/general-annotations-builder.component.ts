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
    date: new FormControl(formatDate(new Date(), 'MMM dd, yyyy', 'en'), [
      // Validators.required
    ])
  });

  @Input() dataFromParent: string;
  @Output() closeForm: EventEmitter<String> = new EventEmitter<String>();
  cacaca;

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
    )
  }

  private mountForm(annotation: GeneralAnnotation): void {
    console.log(annotation);
    this.annotationForm.controls.desc.setValue(annotation.description);
    this.annotationForm.controls.date.setValue(formatDate(annotation.date, 'MMM dd, yyyy', 'en'));
  }

  private isEdit(): void {
    if (this.dataFromParent !== 'noEdit') {
      this.updateMode = true;
    }
  }

  public submit() {
    const annotation = new GeneralAnnotation(null, null, formatDate(this.annotationForm.value.date, 'yyyy-MM-dd', 'en')
      , this.annotationForm.value.desc, true);
      console.log(this.annotationForm.value.date);
      console.log(this.cacaca);
      
      console.log(this.annotationForm.value.desc);
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
