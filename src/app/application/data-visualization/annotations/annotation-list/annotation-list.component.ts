import { Component, OnInit, OnDestroy, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { Subscription } from 'rxjs';
import { Annotation } from '../../../../models/annotation';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { File } from '../../../../models/file';
import * as moment from 'moment';
import { ItemList } from '../../../../models/itemList';
import { TroubleshootingParentService } from '../../../../services/troubleshooting-parent.service';
import { ItemList2 } from '../../../../models/itemList2';
declare var M: any;

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private troubleshootingService: TroubleshootingService, private troubleParentService: TroubleshootingParentService) { }

  private itemList$: Subscription;

  @Input() file: File;

  @Input() annotation: Annotation;

  @Output() annotationAction = new EventEmitter<{ action: string, annotation: Annotation }>();

  updating = false;

  // annotation = new Annotation(null, null, null, [], [], [], null, null);

  items: { [key: string]: any } = {};

  caca = [];


  ngOnInit() {
    console.log('inito');
    
    this.subscribeToItemList();
  }

  ngOnDestroy() {
    this.itemList$.unsubscribe();
  }

  ngOnChanges() {
    if (this.annotation !== undefined) {
      this.annotation.date = this.prepareDate();
      this.annotation.labSystem = this.file.labSystem;
      this.fillItems();
      if (this.annotation.apiKey === null) {
        this.updating = false;
      } else {
        this.updating = true;
      }
    } else {
      this.updating = false;
      this.items = {};
      this.annotation = new Annotation(null, null, null, [], [], null, null, null);
    }
  }

  private fillItems(): void {
    if (this.annotation === undefined) {
      return;
    }
    if (this.annotation.actions.length > 0) {
      this.fillItemList({
        type: TroubleshootingType.ACTION,
        items: this.annotation.actions
      });
    } else {
      this.annotation.actions = [];
    }
    if (this.annotation.problems.length > 0) {
      this.fillItemList({
        type: TroubleshootingType.PROBLEM,
        items: this.annotation.problems
      });
    } else {
      this.annotation.problems = [];
    }
  }

  private prepareDate(): Date {
    return moment(this.file.creationDate).local().utcOffset(120).toDate();
  }

  private subscribeToItemList(): void {
    console.log('subscribing');
    
    this.itemList$ = this.troubleParentService.itemList$
      .subscribe(
        (list) => {
          console.log(list);
          
          this.fillItemList(list);
        }
      ),
      (err) => {
        console.log(err);
        
      };
  }

  private fillItemList(list: ItemList2): void {
    // console.log(list);
    this.items[list.type] = list.items;
    // console.log(this.items);
    
    if (this.items[list.type].length === 0) {
      this.items[list.type] = [];
    }
    // console.log(this.items);
    this.caca.push(list)
    console.log(this.caca);
    

  }

  itemListLength(): number {
    return Object.keys(this.items).length;
  }

  saveTroubleshooting(): void {
    this.fillAnnotation();
    console.log(this.annotation);
    
    this.annotationAction.emit({ action: 'save', annotation: this.annotation });
  }

  private fillAnnotation(): void {
    this.annotation.date = this.prepareDate();
    this.annotation.labSystem = this.file.labSystem;
    for (const item of this.caca) {
      
      switch (item.type) {
        case 'action':
          this.annotation.actions.push(item.items);
          break;
          case 'problem':
            this.annotation.problems.push(item.items);
          break;
      }
    }
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


}
