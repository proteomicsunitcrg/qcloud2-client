import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
      Validators.required
    ])
  });

  @Output() closeForm: EventEmitter<String> = new EventEmitter<String>();

  ngOnInit() {
    M.AutoInit();
  }

  public submit() {
    const annotation = new GeneralAnnotation(null, null, formatDate(this.annotationForm.value.date, 'yyyy-MM-dd', 'en')
      , this.annotationForm.value.desc, true);
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
