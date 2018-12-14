import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { Subscription } from 'rxjs';
import { Annotation } from '../../../../models/annotation';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { AnnotationService } from '../../../../services/annotation.service';
import { File } from '../../../../models/file';
import * as moment from 'moment';
@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private troubleshootingService: TroubleshootingService,
    private annotationService: AnnotationService) { }

  private itemList$: Subscription;

  @Input() file: File;

  annotation = new Annotation(null, null, null, [], [], [], null, null);

  items: { [key: string]: any } = {};

  ngOnInit() {
    this.subscribeToItemList();
  }

  ngOnDestroy() {
    this.itemList$.unsubscribe();
  }

  ngOnChanges() {
    if (this.file !== undefined) {
      this.annotation.date = this.prepareDate();
      this.annotation.labSystem = this.file.labSystem;
    }
  }

  private prepareDate(): Date {
    return moment(this.file.creationDate).local().utcOffset(120).toDate();
  }

  private subscribeToItemList(): void {
    this.itemList$ = this.troubleshootingService.itemList$
      .subscribe(
        (list) => {
          this.items[list.type] = list.items;
          if (this.items[list.type].length === 0) {
            delete this.items[list.type];
          }
        }
      );
  }

  itemListLength(): number {
    return Object.keys(this.items).length;
  }

  saveTroubleshooting(): void {
    this.fillAnnotation();
    this.annotationService.addAnnotation(this.annotation)
      .subscribe(
        (annotation) => {
          console.log('server', annotation);
        }
      );
  }

  private fillAnnotation(): void {
    for (const key of Object.keys(this.items)) {
      switch (key) {
        case TroubleshootingType.ACTION:
          this.annotation.actions = this.items[key];
          break;
        case TroubleshootingType.PROBLEM:
          this.annotation.problems = this.items[key];
          break;
      }
    }
  }

}
