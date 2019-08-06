import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { GeneralAnnotation } from '../../../models/GeneralAnnotation';
import { GeneralAnnotationService } from '../../../services/general-annotation-service';
declare var M: any;
@Component({
  selector: 'app-general-annotations-builder',
  templateUrl: './general-annotations-builder.component.html',
  styleUrls: ['./general-annotations-builder.component.css']
})
export class GeneralAnnotationsBuilderComponent implements OnInit {

  constructor(private generalAnnotationService: GeneralAnnotationService) { }

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

  ngOnInit() {
    M.AutoInit();
  }

  public submit() {
    const annotation =  new GeneralAnnotation(null, null, formatDate(this.annotationForm.value.date, 'yyyy-MM-dd', 'en'), this.annotationForm.value.desc, true);
    this.generalAnnotationService.saveGeneralAnnotation(annotation).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

}
