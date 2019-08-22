import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralAnnotationService } from '../../../services/general-annotation-service';
import { GeneralAnnotation } from '../../../models/GeneralAnnotation';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../shared/ToastConfig';
declare let M: any;
@Component({
  selector: 'app-general-annotations-list',
  templateUrl: './general-annotations-list.component.html',
  styleUrls: ['./general-annotations-list.component.css']
})
export class GeneralAnnotationsListComponent implements OnInit {

  constructor(private generalAnnotationService: GeneralAnnotationService,
    private toastr: ToastrService) { }

  @Output() openForm: EventEmitter<string> = new EventEmitter<string>();

  annotations: GeneralAnnotation[];

  ngOnInit() {
    this.getAllGeneralAnnotations();
  }

  private getAllGeneralAnnotations(): void {
    this.generalAnnotationService.getAllGeneralAnnotations().subscribe(
      res => this.annotations = res,
      () => this.toastr.error('Error retrieving the data', null, TOASTSETTING)
    );
  }

  /**
   * Emits the output to show the annotation builder
   */
  public openFormEvent(edit: boolean, id?: number): void {
    // if (edit) {
    //   this.openForm.emit(id.toString());
    //   console.log('edit');
    // } else {
    this.openForm.emit('noEdit');
    console.log('noEdit');
    // }
  }

  public toggleActive(annotation: GeneralAnnotation) {
    this.generalAnnotationService.toggleActive(annotation.apiKey).subscribe(
      () => this.toastr.success('General annotation toggled', null, TOASTSETTING),
      () => this.toastr.error('Error toggling the annotation', null, TOASTSETTING)
    );
  }

  public delete(id: number): void {
    this.generalAnnotationService.deleteGeneralAnnotation(id).subscribe(
      res => {
        if (res) {
          this.toastr.success('General annotation deleted', null, TOASTSETTING);
          this.getAllGeneralAnnotations();
        } else {
          this.toastr.error('Problem deleting the annotation', null, TOASTSETTING);
        }
      },
      () => {
        this.toastr.error('Problem deleting the annotation', null, TOASTSETTING);
      }
    );
  }

}
