import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTINGLONG } from '../../../../app/shared/ToastConfig';
import { APIKEYREGEX } from '../api-key-utils';
import { UserService } from '../../../../app/services/user.service';
import { Node } from 'src/app/models/node';

@Component({
  selector: 'app-api-key-user',
  templateUrl: './api-key-user.component.html',
  styleUrls: ['./api-key-user.component.css']
})
export class ApiKeyUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private toast: ToastrService) { }

  apiKey: string;

  apiKeyForm = new FormGroup({
    apiKeyInput: new FormControl('', [
      Validators.required,
      Validators.pattern(APIKEYREGEX)
    ])
  });

  ngOnInit() {
  }

  public find(): void {
    this.userService.getUserByApiKey(this.apiKeyForm.controls['apiKeyInput'].value).subscribe(
      res => {
        const userApiKey = Object.keys(res)[0];
        const node = Object.values(res)[0];
        this.router.navigate(['/application/intranet/node/', node['apiKey']], { queryParams: { userApiKey: userApiKey } });
      },
      err => {
        this.toast.error('Node not found', null, TOASTSETTINGLONG);
      }
    );
  }

}
