import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Troubleshooting } from '../../../models/troubleshooting';
import { TroubleshootingService } from '../../../services/troubleshooting.service';
import { TroubleshootingType } from '../../../models/troubleshootingType';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
declare var M: any;

@Component({
  selector: 'app-troubleshooting-form',
  templateUrl: './troubleshooting-form.component.html',
  styleUrls: ['./troubleshooting-form.component.css']
})
export class TroubleshootingFormComponent implements OnInit {

  constructor(private troubleshootingService: TroubleshootingService,
    private modalService: ModalService) { }

  @Input() troubleshootingType: TroubleshootingType;

  @Output() saved = new EventEmitter<Troubleshooting>();

  problem = new Troubleshooting(null, null, null, null, true);

  ngOnInit() {
    this.enableText();
  }

  onSubmit(): void {
    this.troubleshootingService.addTroubleshooting(this.problem, this.troubleshootingType)
      .subscribe(
        (problem) => {
          this.saved.emit(problem);
        }, err => this.modalService.openModal(new Modal('Error', err.error.message, 'Ok', null, 'add ts item', null))
      );
  }

  private enableText(): void {
    M.updateTextFields();
  }

}
