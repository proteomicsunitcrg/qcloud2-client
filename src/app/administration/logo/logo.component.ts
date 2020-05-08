import { Component, OnInit } from '@angular/core';
import { LogoService } from 'src/app/services/logo.service';
import { Logo } from '../../models/Logo';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from '../../shared/ToastConfig';
import { Message } from '../../models/message';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(private logoService: LogoService, private router: Router, private toast: ToastrService) { }

  allLogos: Logo[]

  ngOnInit() {
    this.getAllLogos();
  }

  private getAllLogos(): void {
    this.logoService.getAllLogos().subscribe(
      res => {
        this.allLogos = res;
      },
      err => console.error(err)
    );
  }

  public newLogo(): void {
    this.router.navigate(['/application/administration/logo/new']);
  }

  public enableDisable(logo: Logo, $event: Event): void {
    $event.stopPropagation();
    this.logoService.enableDisable(logo).subscribe(
      res => {
        this.toast.success('Logo updated', 'Success!', TOASTSETTING);
        this.getAllLogos()
      },
      err => {
        this.toast.error(err.error.message, err.error.error, TOASTSETTINGLONG);
        console.error(err);
        this.getAllLogos()
      },
    );
  }

  public delete(logo: Logo, $event: Event): void {
    $event.stopPropagation();
    this.logoService.deleteLogo(logo).subscribe(
      res => {
        this.toast.success('Logo deleted', 'Success!', TOASTSETTING);
        this.getAllLogos();
      },
      err => {
        this.toast.error(err.error.message, err.error.error, TOASTSETTINGLONG);
        console.error(err);
        this.getAllLogos()
      }
    );
  }

  public updateLogo(logo: Logo): void {
    this.router.navigate(['/application/administration/logo/editor', logo.apiKey])
  }

}
