import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

import { Modal} from '../../models/modal';
import { ModalResponse} from '../../models/modalResponse';
import { ModalService } from '../../common/modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modal = new Modal('', '', '', '', '',null);

  constructor(private modalService: ModalService) {
    modalService.selectedModal$.subscribe((modal) => {
      this.modal = modal;
      const elem = document.querySelector('.modal');
      const instance = M.Modal.init(elem, {opacity: 0});
      instance.open();
    });
  }

  ngOnInit() {
  }

  formCancel(): void {
    this.modalService.sendAction(new ModalResponse(this.modal.modalAction, 'cancel',this.modal.objectInstance));
  }
  formAction(): void {
    this.modalService.sendAction(new ModalResponse(this.modal.modalAction, 'accept',this.modal.objectInstance));
  }
}