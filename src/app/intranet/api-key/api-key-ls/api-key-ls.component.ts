import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { System } from '../../../../app/models/system';
import { Node } from '../../../../app/models/node';
import { NodeIntranetService } from 'src/app/services/node-intranet.service';
import { APIKEYREGEX } from '../api-key-utils';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from '../../../shared/ToastConfig';

@Component({
  selector: 'app-api-key-ls',
  templateUrl: './api-key-ls.component.html',
  styleUrls: ['./api-key-ls.component.css']
})
export class ApiKeyLsComponent implements OnInit {

  constructor(private nodeService: NodeIntranetService, private router: Router, private toast: ToastrService
    ) { }

  apiKey: string;

  node: Node;

  labsystems: System[] = [];

  apiKeyForm = new FormGroup({
    apiKeyInput: new FormControl('', [
      Validators.required,
      Validators.pattern(APIKEYREGEX)
    ])
  });

  ngOnInit() {
  }

  public find(): void {
    this.nodeService.getLs(this.apiKeyForm.controls['apiKeyInput'].value).subscribe(
      res => {
        console.log(res);
        this.nodeService.getNodeByLsApiKey(res.apiKey).subscribe(
          resNode => {
            this.router.navigate(['/application/intranet/node/', resNode.apiKey], { queryParams: { lsApiKey: res.apiKey } });
          },
          errNode => {
            this.toast.error('Node not found', null, TOASTSETTINGLONG);

          }
        );
      },
      err => {
        this.toast.error('Labsystem not found', null, TOASTSETTINGLONG);
        console.error(err);
      }
    );
  }



}
