import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { PlotService } from '../../../../services/plot.service';
import { Subscription } from 'rxjs';
import { FileService } from '../../../../services/file.service';
import { File } from '../../../../models/file';
import { AnnotationService } from '../../../../services/annotation.service';
import { Annotation } from '../../../../models/annotation';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../../shared/ToastConfig';
declare var M: any;

@Component({
  selector: 'app-annotation-main',
  templateUrl: './annotation-main.component.html',
  styleUrls: ['./annotation-main.component.css']
})
export class AnnotationMainComponent implements OnInit, OnDestroy {

  constructor(private plotService: PlotService,
    private fileService: FileService,
    private annotationService: AnnotationService,
    private toastr: ToastrService,
    private clipboard: ClipboardService) { }

  @Output() actionSent = new EventEmitter<boolean>();

  troubleshootingTypesENUM = TroubleshootingType;

  plotFileChecksum$: Subscription;

  checksum: string;

  annotation: Annotation;

  file: File;

  elapsedTime: any;
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
          if (file.insertDate != null) {
            const diffMiliseconds = (new Date(file.insertDate).getTime() - new Date(file.creationDate).getTime());
            this.elapsedTime = this.toHHMMSS(diffMiliseconds);
          } else {
            this.elapsedTime = 'Not available';
          }
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
          this.toastr.success('Annotation saved', null, TOASTSETTING);
          this.actionSent.emit(true);
        }
      );
  }

  private updateAnnotationFromServer(annotation: Annotation): void {
    this.annotationService.updateAnnotation(annotation)
      .subscribe(
        () => {
          this.toastr.success('Annotation updated', null, TOASTSETTING);
          this.actionSent.emit(true);
        },
        () => this.toastr.error('Error', 'Try again later or contact the QCloud team', TOASTSETTING)
      );
  }

  private deleteAnnotationFromServer(annotation: Annotation): void {
    this.annotationService.deleteAnnotation(annotation)
      .subscribe(
        () => {
          this.annotation = undefined;
          this.toastr.success('Annotation deleted', null, TOASTSETTING);
          this.actionSent.emit(true);
        },
        () => this.toastr.error('Error', 'Try again later or contact the QCloud team', TOASTSETTING)
      );
  }

  private checkIfNoTroubleshootingOnAnnotation(annotation: Annotation): boolean {
    return (annotation.troubleshootings.length === 0);
  }

  goBack(): void {
    this.actionSent.emit(true);
  }

  public copyToClipboard(): void {
    this.clipboard.copyFromContent(this.file.filename);
  }

  private toHHMMSS(milis: any) {
    const sec_num = milis / 1000;
    const days = Math.floor(sec_num / 86400);
    let hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (days > 0) {
      hours = hours - (24 * days);
      return days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
    } else if (hours === 1) {
      return hours + ' hour ' + minutes + ' minutes ' + seconds + ' seconds';
    } else if (hours > 0) {
      return hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
    } else if (minutes > 0) {
      return minutes + ' minutes ' + seconds + ' seconds';
    } else if (seconds > 0) {
      return seconds + ' seconds';
    } else if (seconds === 0) {
      return this + ' Milliseconds (not enough for seconds!)';
    } else {
      return days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
    }
  }
}
