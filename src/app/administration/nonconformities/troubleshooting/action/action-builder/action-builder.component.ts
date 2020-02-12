import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionService } from '../../../../../services/action.service';
import { Action } from '../../../../../models/action';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from '../../../../../shared/ToastConfig';

@Component({
  selector: 'app-action-builder',
  templateUrl: './action-builder.component.html',
  styleUrls: ['./action-builder.component.css']
})
export class ActionBuilderComponent implements OnInit {

  constructor(private actionService: ActionService, private activeRouter: ActivatedRoute,
    private toast: ToastrService, private route: Router) { }

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

  apiKey: string;

  ngOnInit() {
    this.activeRouter.params.subscribe(
      params => {
        if (params.apiKey !== null && params.apiKey !== undefined) {
          if(params.apiKey !== 'new') {
            this.edit = true;
            this.retrieveInfo(params.apiKey);
            this.apiKey = params.apiKey;
          }
        }
      }
    );
  }

  public save(): void {
    this.actionService.saveAction(this.constructObject()).subscribe(
      res => {
        this.toast.success('Action saved', 'Success', TOASTSETTING);
      },
      err => {
        this.toast.error('Error saving action', 'ERROR', TOASTSETTING);
      }
    );
  }

  public update(): void {
    this.actionService.updateAction(this.constructObject(), this.apiKey).subscribe(
      res => {
        this.toast.success('Action updated', 'Success', TOASTSETTING);
      },
      err => {
        this.toast.error('Error updating action', 'ERROR', TOASTSETTING);
      }
    );
  }

  private retrieveInfo(apiKey: string): void {
    this.actionService.getActionByApiKey(apiKey).subscribe(
      res => {
        this.mountForm(res);
      }, 
      err => {
        this.toast.error('Error retrieving the action', 'ERROR', TOASTSETTING);
      }
    );
  }

  private constructObject(): Action {
    return new Action(this.builderForm.value.name,
      this.builderForm.value.description, this.builderForm.value.qccv, null, true);
  }

  private mountForm(action: Action): void {
    this.builderForm.controls['name'].setValue(action.name);
    this.builderForm.controls['description'].setValue(action.description);
    this.builderForm.controls['qccv'].setValue(action.qccv);
  }

  public goBack(): void {
    this.route.navigate(['application/administration/troubleshooting/action']);
  }
}
