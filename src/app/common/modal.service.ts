import { Injectable } from '@angular/core';
import { Modal } from '../models/modal';
import { BottomModal } from '../models/bottomModal';
import { ModalResponse } from '../models/modalResponse';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

  private modalSource = new Subject<Modal>();

  private modalAction = new Subject<ModalResponse>();

  selectedModal$ = this.modalSource.asObservable();

  selectedAction$ = this.modalAction.asObservable();

  /**
   * This is the observable for the bottom modal
   * At this moment it will be used only at the
   * view creation screen, asking the user how
   * many columns want
   */
  private bottomModalSource = new Subject<BottomModal>();

  selectedBottomModal$ = this.bottomModalSource.asObservable();

  private bottomModalAction = new Subject<ModalResponse>();

  selectedBottomModalAction$ = this.bottomModalAction.asObservable();

  constructor() { }

  openBottomModal(modal: BottomModal): void {
    this.bottomModalSource.next(modal);
  }

  sendBottomModalAction(action: ModalResponse): void {
    this.bottomModalAction.next(action);
  }


  openModal(modal: Modal): void {    
    this.modalSource.next(modal);
  }

  sendAction(action: ModalResponse): void {
    this.modalAction.next(action);
  }


}
