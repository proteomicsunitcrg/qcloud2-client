import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { PlotService } from '../../../../services/plot.service';
import { Subscription } from 'rxjs';
import { FileService } from '../../../../services/file.service';
import { File } from '../../../../models/file';
import { AnnotationService } from '../../../../services/annotation.service';
import { Annotation } from '../../../../models/annotation';
declare var M: any;

@Component({
  selector: 'app-annotation-main',
  templateUrl: './annotation-main.component.html',
  styleUrls: ['./annotation-main.component.css']
})
export class AnnotationMainComponent implements OnInit, OnDestroy {

  constructor(private plotService: PlotService,
    private fileService: FileService,
    private annotationService: AnnotationService) { }

  @Output() actionSent = new EventEmitter<boolean>();

  troubleshootingTypesENUM = TroubleshootingType;

  plotFileChecksum$: Subscription;

  checksum: string;

  annotation: Annotation;

  file: File;

  ngOnInit() {
    this.subscribeToPlotChecksum();
  }

  ngOnDestroy() {
    this.plotFileChecksum$.unsubscribe();
  }

  private subscribeToPlotChecksum(): void {
    this.plotFileChecksum$ = this.plotService.fileChecksum$
      .subscribe((checksum) => {
        this.loadFile(checksum);
      });
  }

  private loadFile(checksum: string): void {
    this.fileService.getFileByChecksum(checksum)
      .subscribe(
        (file) => {
          this.file = file;
          this.loadTroubleshooting();
        }, err => console.log('load file err', err)
      );
  }

  private loadTroubleshooting(): void {
    this.annotation = undefined;
    // check if there is already an annotation
    this.annotationService.getAnnotationByLabSystemApiKeyAndDate(this.file.labSystem.apiKey, new Date(this.file.creationDate))
      .subscribe(
        (annotation) => {
          if (annotation !== null) {
            this.annotation = annotation;
          } else {
            this.annotation = undefined;
          }
        });
  }

  // returns keys of enum
  troubleshootingTypes(): Array<string> {
    const keys = Object.keys(this.troubleshootingTypesENUM);
    return keys;
  }

  onAction(action: { action: string, annotation: Annotation }): void {
    switch (action.action) {
      case 'save':
        this.addAnnotationInServer(action.annotation);
        break;
      case 'delete':
        this.deleteAnnotationFromServer(action.annotation);
        break;
      case 'update':
        if (this.checkIfNoTroubleshootingOnAnnotation(action.annotation)) {
          this.deleteAnnotationFromServer(action.annotation);
        } else {
          this.updateAnnotationFromServer(action.annotation);
        }
        break;
      default:
        console.log('inknown options');
        break;
    }
  }

  private addAnnotationInServer(annotation: Annotation): void {
    this.annotationService.addAnnotation(annotation)
      .subscribe(
        (res) => {
          M.toast({ html: 'Annotation saved!' });
          this.actionSent.emit(true);
        }
      );
  }

  private updateAnnotationFromServer(annotation: Annotation): void {
    this.annotationService.updateAnnotation(annotation)
      .subscribe(
        (res) => {
          M.toast({ html: 'Annotation updated!' });
          this.actionSent.emit(true);
        }, err => console.log('updateannotacion', err)
      );
  }

  private deleteAnnotationFromServer(annotation: Annotation): void {
    this.annotationService.deleteAnnotation(annotation)
      .subscribe(
        (res) => {
          this.annotation = undefined;
          M.toast({ html: 'Annotation deleted!' });
          this.actionSent.emit(true);
        }, err => {
          console.log('error');
        }
      );
  }

  private checkIfNoTroubleshootingOnAnnotation(annotation: Annotation): boolean {
    return (annotation.actions.length === 0 && annotation.problems.length === 0);
  }

  goBack(): void  {
    this.actionSent.emit(true);
  }
}
