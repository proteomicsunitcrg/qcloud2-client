import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralAnnotationService } from '../../../services/general-annotation-service';
import { GeneralAnnotation } from '../../../models/GeneralAnnotation';
declare let M: any;
@Component({
  selector: 'app-general-annotations-list',
  templateUrl: './general-annotations-list.component.html',
  styleUrls: ['./general-annotations-list.component.css']
})
export class GeneralAnnotationsListComponent implements OnInit {

  constructor(private generalAnnotationService: GeneralAnnotationService) { }

  @Output() openForm: EventEmitter<string> = new EventEmitter<string>();

  annotations: GeneralAnnotation[];

  ngOnInit() {
    this.getAllGeneralAnnotations();
  }

  private getAllGeneralAnnotations(): void {
    this.generalAnnotationService.getAllGeneralAnnotations().subscribe(
      (res) => {
        console.log(res);
        this.annotations = res;
      },
      (err) => console.error(err)
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
      res => console.log(res),
      err => console.error(err)
    );
  }

  public delete(id: number): void {
    this.generalAnnotationService.deleteGeneralAnnotation(id).subscribe(
      res => {
        if (res) {
          M.toast({ html: 'Annotation deleted' });
          this.getAllGeneralAnnotations();
        } else {
          M.toast({ html: 'Problem deleting the annotation' });
        }
      },
      err => {
        M.toast({ html: 'Problem deleting the annotation' });
      }
    );
  }

}
