import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import * as decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserDefaultViewService } from '../../services/user-default-view.service';
import { HttpErrorResponse } from '@angular/common/http';
/**
 * Login component
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  username: string;
  password: string;
  serverOutput = '';
  isBad = false;
  constructor(private authService: AuthService,
    private router: Router,
    private userDefaultViewService: UserDefaultViewService) { }

  ngOnInit() {
    // Check if token already exists
    if (this.authService.isLoggedIn()) {
      if (this.checkAdmin()) {
        this.doNavigationAdmin();
      } else {
        this.doNavigation();
      }
    }
  }

  onSubmit(): void {
    this.isBad = false;
    this.serverOutput = 'Connecting...';
    this.authService.login(this.username, this.password)
      .subscribe(
        (res) => {
          this.authService.setSession(res);
          if (this.checkAdmin()) {
            this.doNavigationAdmin();
          } else {
            this.doNavigation();
          }
        },
        (error: HttpErrorResponse) => {
          this.isBad = true;
          switch (error.status) {
            case 500:
              this.serverOutput = 'Internal server error';
              break;
            case 401:
              this.serverOutput = 'Wrong userame/password';
              break;
            case 408:
              this.serverOutput = 'Request timeout';
              break;
            default:
              this.serverOutput = `Unable to connect with QCloud2 servers`;
              break;
          }
        });
  }

  private checkAdmin(): boolean {
    return this.authService.checkIfAdmin();
  }

  private doNavigation(): void {
    this.userDefaultViewService.findDefaultView()
      .subscribe(
        (userDefaultView) => {
          if (userDefaultView === null) {
            this.router.navigate(['application']);
          } else {
            if (userDefaultView.viewType === 'INSTRUMENT') {
              this.router.navigate(['application/view/instrument/' + userDefaultView.labSystem.apiKey]);
            } else {
              this.router.navigate(['application/view/user/' + userDefaultView.view.apiKey]);
            }
          }
        }
      );
  }

  private doNavigationAdmin(): void {
    this.router.navigate(['/application/intranet/files']);
  }

  doLogout(): void {
    console.log('logout');
    this.authService.logout();
  }
  doTest(): void {
    this.authService.testCredentials().subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }
  doInternalTest(): void {
    const token = localStorage.getItem('id_token');
    const decoded = decode(token);
    console.log(decoded);
    console.log(this.authService.isAuthenticated());
  }

}
