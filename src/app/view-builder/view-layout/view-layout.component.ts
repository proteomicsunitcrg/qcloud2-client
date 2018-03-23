import { Component, OnInit, Input } from '@angular/core';
import { Display } from '../../models/display';
import { Chart } from '../../models/chart';
import { ModalService } from '../../common/modal.service';
import { Modal } from '../../models/modal';
import { BottomModal } from '../../models/bottomModal';
import { ModalResponse } from '../../models/modalResponse';
import { DragulaService } from 'ng2-dragula';
import { ViewService } from '../../services/view.service';
import { LayoutInformation } from '../../models/layoutInformation';
import { delay } from 'q';

@Component({
  selector: 'app-view-layout',
  templateUrl: './view-layout.component.html',
  styleUrls: ['./view-layout.component.css']
})
export class ViewLayoutComponent implements OnInit {

  constructor(private modalService: ModalService,
    private dragulaService: DragulaService,
    private viewService: ViewService) { }

  display = [];
  chartDisplay = [];

  charts=[];

  ngOnInit() {
    this.subscribeToBottomModal();
    this.dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    this.dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    this.dragulaService.setOptions('first-bag', { revertOnSpill: true });
  }

  private onDrop(args) {
    let [e, el] = args;
    let plotId = e.getElementsByClassName('plotId')[0].innerHTML;
    let id = el.getAttribute('id');
    let adding = true;
    /**
     * It will have an id if it is placed
     * in the layout section. This is a way to 
     * know where the item is.
     */

    if (id !== null) {
      // adding     
      adding = true;
    } else {
      // removing
      adding = false;
    }
    let currentElements = el.childElementCount;
    /**
     * If the user tries to add an item in a 
     * bag having a previous item it will cancel
     * the drag.
     * It have a boolean condition for ensure that
     * differenciate the chart pool of the layout
     */
    if (currentElements > 1 && adding) {
      this.dragulaService.find('first-bag').drake.cancel(true);
    } else {
      if (adding) {
        let position = id.split(';');
        this.addChartIntoDisplay(plotId, position);
      }

    }
  }
  private addChartIntoDisplay(plotId: number, position: number[]): void {
    this.chartDisplay[position[0]][position[1]] = plotId;
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something 
    // console.log(el.getAttribute('id'));
  }

  private subscribeToBottomModal(): void {
    this.modalService.selectedBottomModalAction$
      .subscribe(
        (action) => {
          this.doAction(action);
        }
      )
  }

  private doAction(action: ModalResponse): void {
    switch (action.modalAction) {
      case 'addColumn':
        this.display[this.display.length] = [];
        this.chartDisplay[this.chartDisplay.length] = [];
        for (let i = 0; i < Number(action.userAction); i++) {
          this.display[this.display.length - 1].push(null);
          this.chartDisplay[this.chartDisplay.length - 1].push(null);
        }
        break;
      default:
        console.log('error');
        break;
    }
  }

  deleteRow(row: number): void {
    // send information for reestruct the list
    this.display.splice(row, 1);
    let layoutInformation = new LayoutInformation(this.chartDisplay.splice(row, 1), this.chartDisplay);    
    this.viewService.sendDeletedRowToList(layoutInformation);
  }

  addRow(): void {
    this.modalService.openBottomModal(new BottomModal('Add row', 'How many columns do you want', '1', '2', 'newRow', null));
  }

  show(): void {
    console.log(this.chartDisplay);
  }

}
