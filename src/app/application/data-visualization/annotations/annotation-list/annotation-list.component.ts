import { Component, OnInit, OnDestroy } from '@angular/core';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent implements OnInit, OnDestroy {

  constructor(private troubleshootingService: TroubleshootingService) { }

  private itemList$: Subscription;

  items = [];

  ngOnInit() {
    this.subscribeToItemList();
  }

  ngOnDestroy() {
    this.itemList$.unsubscribe();
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

}
