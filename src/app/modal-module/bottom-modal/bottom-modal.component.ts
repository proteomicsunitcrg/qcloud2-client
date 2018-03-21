import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../common/modal.service';
declare var M: any;

@Component({
  selector: 'app-bottom-modal',
  templateUrl: './bottom-modal.component.html',
  styleUrls: ['./bottom-modal.component.css']
})
export class BottomModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.subscribeToBottomModal();
  }

  private subscribeToBottomModal(): void {
    this.modalService.selectedBottomModal$
      .subscribe(
        (modal) => {          
          const elem = document.getElementById('modal2');
          const instance = M.Modal.init(elem, { opacity: 0 });
          instance.open();
        }
      )
  }

}
