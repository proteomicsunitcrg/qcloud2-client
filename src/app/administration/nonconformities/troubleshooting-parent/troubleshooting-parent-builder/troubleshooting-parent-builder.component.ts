import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TroubleShootingParent } from '../../../../models/troubleShootingParent';
import { TroubleshootingParentService } from '../../../../services/troubleshooting-parent.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from '../../../../shared/ToastConfig';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-troubleshooting-parent-builder',
  templateUrl: './troubleshooting-parent-builder.component.html',
  styleUrls: ['./troubleshooting-parent-builder.component.css']
})
export class TroubleshootingParentBuilderComponent implements OnInit {

  constructor(private parentService: TroubleshootingParentService, private toast: ToastrService,
    private route: Router, private activeRouter: ActivatedRoute) { }

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

  edit = false;

  toUpdateApiKey: string;

  ngOnInit() {
    this.activeRouter.params.subscribe(
      params => {
        if (params.apiKey !== null && params.apiKey !== undefined) {
          if(params.apiKey !== 'new') {
            console.log(params.apiKey);
            
            this.edit = true;
            this.retrieveInfo(params.apiKey);
          }
        } else {
          console.log('nada');
        }
      }
    );

  }
  private retrieveInfo(apiKey: string): void {
    this.parentService.getParentByParentApiKey(apiKey).subscribe(
      res => {
        console.log(res);
        this.mountForm(res);
        this.toUpdateApiKey = res.apiKey;
      },
      err => {
        console.error(err);
      }
    );
  }

  private mountForm(parent: TroubleShootingParent): void {
    this.builderForm.controls['name'].setValue(parent.name);
    this.builderForm.controls['description'].setValue(parent.description);
    this.builderForm.controls['qccv'].setValue(parent.qccv);
  }

  mountParentObject(): TroubleShootingParent {
    return new TroubleShootingParent(null, null, this.builderForm.value.name,
      this.builderForm.value.description, this.builderForm.value.qccv, null, null);
  }
  public save(): void {
    const parent = this.mountParentObject();
    console.log(parent);
    this.parentService.saveParent(parent).subscribe(
      res => {
        this.toast.success('Group saved', 'Success', TOASTSETTING);
      },
      err => {
        this.toast.error(`Error`, 'Error', TOASTSETTING);
      }
    );
  }

  public update(): void {
    // console.log(this.mountParentObject());
    this.parentService.updateParent(this.mountParentObject(), this.toUpdateApiKey).subscribe(
      res => {
        this.toast.success('Group updated', 'Success', TOASTSETTING);
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
