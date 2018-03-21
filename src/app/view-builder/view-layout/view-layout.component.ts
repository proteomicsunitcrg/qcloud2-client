import { Component, OnInit, Input } from '@angular/core';
import { Display } from '../../models/display';
import { Chart } from '../../models/chart';
import { ModalService } from '../../common/modal.service';
import { Modal } from '../../models/modal';
import { BottomModal } from '../../models/bottomModal';
import { ModalResponse } from '../../models/modalResponse';

@Component({
  selector: 'app-view-layout',
  templateUrl: './view-layout.component.html',
  styleUrls: ['./view-layout.component.css']
})
export class ViewLayoutComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  display = [];

  ngOnInit() {
    /*
    this.display[0] = [];
    this.display[0][0] = 'Uno';
    this.display[0][1] = 'Dos';
    this.display[1] = [];
    this.display[1][0] = 'Tres'
    console.log(this.display);
    */
    this.subscribeToBottomModal();
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
        for (let i = 0; i < Number(action.userAction); i++) {
          this.display[this.display.length-1].push('caca');

        }
        break;
      default:
        console.log('error');
        break;
    }
  }

  addRow(): void {
    this.modalService.openBottomModal(new BottomModal('Add row', 'How many columns do you want', '1', '2', 'newRow', null));
  }

}
