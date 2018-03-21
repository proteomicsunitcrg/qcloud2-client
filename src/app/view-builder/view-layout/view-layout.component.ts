import { Component, OnInit, Input } from '@angular/core';
import { Display } from '../../models/display';
import { Chart } from '../../models/chart';
import { ModalService } from '../../common/modal.service';
import { Modal } from '../../models/modal';
import { BottomModal } from '../../models/bottomModal';

@Component({
  selector: 'app-view-layout',
  templateUrl: './view-layout.component.html',
  styleUrls: ['./view-layout.component.css']
})
export class ViewLayoutComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  display = [];
  
  ngOnInit() {
    this.display[0] = [];
    this.display[0][0]= 'Uno';
    this.display[0][1]= 'Dos';
    this.display[1] = [];
    this.display[1][0] = 'Tres'
    console.log(this.display);
  }

  addRow(): void {
    this.modalService.openBottomModal(new BottomModal('Add row','How many columns do you want','1','2','newRow',null));
  }

}
