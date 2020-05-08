import { Component, OnInit } from '@angular/core';
import { LogoService } from 'src/app/services/logo.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Logo } from '../../../models/Logo';
import { TOASTSETTING, TOASTSETTINGLONG } from 'src/app/shared/ToastConfig';
declare var M;

@Component({
  selector: 'app-logo-editor',
  templateUrl: './logo-editor.component.html',
  styleUrls: ['./logo-editor.component.css']
})
export class LogoEditorComponent implements OnInit {

  constructor(private logoService: LogoService, private toast: ToastrService, private router: Router, private activeRouter: ActivatedRoute) { }
  logo: Logo;
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
    this.activeRouter.params.subscribe(
      params => {
        if (params.apiKey !== null && params.apiKey !== undefined) {
          this.retrieveInfo(params.apiKey);
        } else {
          this.router.navigate(['/application/administration/logo'])
        }
      }
    );
    M.AutoInit()
  }

  public update(): void {
    this.logoService.updateLogo(new Logo(this.logo.id, this.logo.apiKey, this.logoForm.value.url, this.logoForm.value.alt, this.logoForm.value.name, this.logo.active)).subscribe(
      res => {
        this.toast.success('Logo updated', 'Success!', TOASTSETTING);
      },
      err => {
        console.error(err);
        this.toast.error(err.error.error, 'Error!', TOASTSETTINGLONG);
      }
    );
  }

  private retrieveInfo(apiKey: String): void {
    this.logoService.getByApiKey(apiKey).subscribe(
      res => {
        this.logoForm.controls.name.setValue(res.name);
        this.logoForm.controls.url.setValue(res.url);
        this.logoForm.controls.alt.setValue(res.alt);
        this.logo = res;
      },
      err => {
        console.error(err);
      }
    )
  }

  public closeForm(): void {
    this.router.navigate(['/application/administration/logo',]);
  }

}
