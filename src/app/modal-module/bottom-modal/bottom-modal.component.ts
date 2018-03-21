import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../common/modal.service';
import { ModalResponse } from '../../models/modalResponse';
declare var M: any;

@Component({
  selector: 'app-bottom-modal',
  templateUrl: './bottom-modal.component.html',
  styleUrls: ['./bottom-modal.component.css']
})
export class BottomModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  instance = null;

  ngOnInit() {
    this.subscribeToBottomModal();
  }

  private subscribeToBottomModal(): void {
    this.modalService.selectedBottomModal$
      .subscribe(
        (modal) => {          
          const elem = document.getElementById('modal2');
          this.instance = M.Modal.init(elem, { opacity: 0 });
          this.instance.open();
        }
      )
  }
  addColumn(cols: number): void {
    if(cols===1 || cols===2) {
      // close modal
      this.instance.close();
      this.modalService.sendBottomModalAction(new ModalResponse('addColumn',cols.toString(),null));
      
    }else {
      console.log('error');
    }
  }

}
