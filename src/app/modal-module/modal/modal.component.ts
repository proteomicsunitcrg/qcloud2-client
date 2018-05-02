import { Component, OnInit, OnDestroy } from '@angular/core';
//import * as M from 'materialize-css/dist/js/materialize';

import { Modal} from '../../models/modal';
import { ModalResponse} from '../../models/modalResponse';
import { ModalService } from '../../common/modal.service';
import { Subscription } from 'rxjs/Subscription';
declare var M: any;

/**
 * Regular modal component
 * It is used in the root of the application and all the components
 * using this modal must load the modalService and operate through it. 
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit,OnDestroy {

  modal = new Modal('', '', '', '', '',null);

  selectedModal$: Subscription;

  constructor(private modalService: ModalService) {
    
  }

  ngOnInit() {
    this.subscribeToModal();
  }
  ngOnDestroy() {
    this.selectedModal$.unsubscribe();
  }
  /**
   * THis subscription is used to show the modal.
   * The modal content is set with a modal object instance
   * passed as a parameter.
   */
  private subscribeToModal(): void {
    this.selectedModal$ = this.modalService.selectedModal$.subscribe((modal) => {
      this.modal = modal;
      const elem = document.querySelector('.modal');
      const instance = M.Modal.init(elem, {opacity: 0});
      instance.open();
    });
  }

  /**
   * Both formAction and formCancel dismiss the modal and send
   * a modalResponse object with some data of the user response.
   */

  formCancel(): void {
    this.modalService.sendAction(new ModalResponse(this.modal.modalAction, 'cancel',this.modal.objectInstance));
  }
  formAction(): void {
    this.modalService.sendAction(new ModalResponse(this.modal.modalAction, 'accept',this.modal.objectInstance));
  }
}