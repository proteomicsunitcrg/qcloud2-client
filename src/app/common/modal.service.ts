import { Injectable } from '@angular/core';
import { Modal } from '../models/modal';
import { ModalResponse } from '../models/modalResponse';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

  private modalSource = new Subject<Modal>();

  private modalAction = new Subject<ModalResponse>();

  selectedModal$ = this.modalSource.asObservable();

  selectedAction$ = this.modalAction.asObservable();

  constructor() { }

  openModal(modal: Modal): void {
    this.modalSource.next(modal);
  }

  sendAction(action: ModalResponse): void {
    this.modalAction.next(action);
  }


}
