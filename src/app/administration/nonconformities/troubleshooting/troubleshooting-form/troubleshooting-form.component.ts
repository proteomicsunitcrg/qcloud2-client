import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Troubleshooting } from '../../../../models/troubleshooting';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { ModalService } from '../../../../common/modal.service';
import { Modal } from '../../../../models/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../../shared/ToastConfig';
import { TOASTSETTINGLONG } from '../../../../shared/ToastConfig';
declare var M: any;

@Component({
  selector: 'app-troubleshooting-form',
  templateUrl: './troubleshooting-form.component.html',
  styleUrls: ['./troubleshooting-form.component.css']
})
export class TroubleshootingFormComponent implements OnInit {

  constructor(private troubleshootingService: TroubleshootingService, private router: Router, private toast: ToastrService) { }

  problem = new Troubleshooting(null, null, null, null, null, null, null, null);

  ngOnInit() {
    this.enableText();
    M.AutoInit();
  }


  public save(): void {
    console.log(this.problem);
    this.troubleshootingService.addTroubleshooting(this.problem).subscribe(
      res => {
        this.toast.success('Chart saved', null, TOASTSETTING);
      },
      err => {
        this.toast.success('ERROR', err.message, TOASTSETTINGLONG);
        console.error(err);
      }
    );
  }

  public goBack(): void {
    this.router.navigate(['/application/administration/troubleshooting']);
  }

  private enableText(): void {
    M.updateTextFields();
  }

}
