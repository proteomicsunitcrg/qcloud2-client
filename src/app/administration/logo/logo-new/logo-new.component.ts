import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Logo } from '../../../models/Logo';
import { LogoService } from '../../../services/logo.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from '../../../shared/ToastConfig';
import { Router } from '@angular/router';
declare var M;

@Component({
  selector: 'app-logo-new',
  templateUrl: './logo-new.component.html',
  styleUrls: ['./logo-new.component.css']
})
export class LogoNewComponent implements OnInit {

  constructor(private logoService: LogoService, private toast: ToastrService, private router: Router) { }

  logoForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    alt: new FormControl('', [
      Validators.required
    ]),
    url: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  ngOnInit() {
    M.AutoInit();
  }

  public save(): void {
    this.logoService.saveLogo(new Logo(null, null, this.logoForm.value.url, this.logoForm.value.alt, this.logoForm.value.name, false))
      .subscribe(
        res => {
          this.toast.success('New logo added', 'Success!', TOASTSETTING);
        },
        err => {
          console.error(err);
          this.toast.error(err.error.error, 'Error!', TOASTSETTINGLONG);
        }
      );
  }

  public closeForm(): void {
    this.router.navigate(['/application/administration/logo', ]);
  }

}
