import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TroubleShootingParent } from '../../../../models/troubleShootingParent';
import { TroubleshootingParentService } from '../../../../services/troubleshooting-parent.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from '../../../../shared/ToastConfig';
import { Router } from '@angular/router';


@Component({
  selector: 'app-troubleshooting-parent-builder',
  templateUrl: './troubleshooting-parent-builder.component.html',
  styleUrls: ['./troubleshooting-parent-builder.component.css']
})
export class TroubleshootingParentBuilderComponent implements OnInit {

  constructor(private parentService: TroubleshootingParentService, private toast: ToastrService,
    private route: Router) { }

  builderForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    qccv: new FormControl('', [
      Validators.required
    ])
  });

  ngOnInit() {
  }

  public save(): void {
    const parent = new TroubleShootingParent(null, null, this.builderForm.value.name,
      this.builderForm.value.description, this.builderForm.value.qccv, null, null);
    console.log(parent);
    this.parentService.saveParent(parent).subscribe(
      res => {
        this.toast.success('Group saved', 'Success', TOASTSETTING);
      },
      err => {
        this.toast.success(`Error`, 'Error', TOASTSETTING);
      }
    );
  }

  public goBack(): void {
    this.route.navigate([`application/administration/troubleshooting`]);
  }
}
