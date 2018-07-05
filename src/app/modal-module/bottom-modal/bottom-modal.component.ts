import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../common/modal.service';
import { ModalResponse } from '../../models/modalResponse';
import { Subscription } from 'rxjs';
declare var M: any;

/**
 * Bottom modal component. It is used in the generation
 * of views situation.
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-bottom-modal',
  templateUrl: './bottom-modal.component.html',
  styleUrls: ['./bottom-modal.component.css']
})
export class BottomModalComponent implements OnInit, OnDestroy {

  constructor(private modalService: ModalService) { }

  instance = null;

  selectedBottomModal$: Subscription;

  ngOnInit() {
    this.subscribeToBottomModal();
  }
  ngOnDestroy() {
    this.selectedBottomModal$.unsubscribe();
  }

  private subscribeToBottomModal(): void {
    this.selectedBottomModal$ = this.modalService.selectedBottomModal$
      .subscribe(
        (modal) => {
          const elem = document.getElementById('modal2');
          this.instance = M.Modal.init(elem, { opacity: 0 });
          this.instance.open();
        }
      );
  }
  addColumn(cols: number): void {
    if (cols === 1 || cols === 2) {
      // close modal
      this.instance.close();
      this.modalService.sendBottomModalAction(new ModalResponse('addColumn', cols.toString(), null));
    } else {
      console.log('error');
    }
  }

}
