import { Component, OnInit, OnDestroy, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { Subscription } from 'rxjs';
import { Annotation } from '../../../../models/annotation';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { File } from '../../../../models/file';
import * as moment from 'moment';
import { Troubleshooting } from '../../../../models/troubleshooting';
declare var M: any;

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private troubleshootingService: TroubleshootingService) { }

  private itemList$: Subscription;

  @Input() file: File;

  @Input() annotation: Annotation;

  @Output() annotationAction = new EventEmitter<{ action: string, annotation: Annotation }>();

  updating = false;

  troubleList: Troubleshooting[] = [];


  ngOnInit() {
    this.subscribeToItemList();
  }

  ngOnDestroy() {
    this.itemList$.unsubscribe();
  }

  ngOnChanges() {
    this.troubleList = [];
    if (this.annotation !== undefined) {
      this.annotation.date = this.prepareDate();
      this.annotation.labSystem = this.file.labSystem;
      if (this.annotation.apiKey === null) {
        this.updating = false;
      } else {
        this.updating = true;
        this.troubleList = this.annotation.troubleshootings;
      }
    } else {
      this.updating = false;
      this.annotation = new Annotation(null, null, null, [], null, null, null, null);
    }
  }

  private prepareDate(): Date {
    return moment(this.file.creationDate).local().utcOffset(120).toDate();
  }

  private subscribeToItemList(): void {
    this.itemList$ = this.troubleshootingService.itemList$
      .subscribe(
        (list) => {
          this.fillItemList(list);
        }
      );
  }

  private fillItemList(tr: Troubleshooting): void {
    for (const element of this.troubleList) {
      if (element.apiKey === tr.apiKey) {
        return;
      }
    }
    this.troubleList.push(tr);
  }

  saveTroubleshooting(): void {
    this.fillAnnotation();
    this.annotationAction.emit({ action: 'save', annotation: this.annotation });
  }

  private fillAnnotation(): void {
    this.annotation.date = this.prepareDate();
    this.annotation.labSystem = this.file.labSystem;
    this.annotation.troubleshootings = this.troubleList;
  }

  updateTroubleshooting(): void {
    this.fillAnnotation();
    this.annotationAction.emit({ action: 'update', annotation: this.annotation });
    this.annotation = undefined;
  }

  deleteTroubleshooting(): void {
    this.annotationAction.emit({ action: 'delete', annotation: this.annotation });
    this.annotation = undefined;
  }

  public removeFromList(trouble): void {
    this.troubleList.forEach((item, index) => {
      if (item.apiKey === trouble.apiKey) {
        this.troubleList.splice(index, 1);
      }
    });
  }


}
