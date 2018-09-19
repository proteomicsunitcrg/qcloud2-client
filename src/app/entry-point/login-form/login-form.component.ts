import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { AuthService } from '../../auth.service';
import * as decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserDefaultViewService } from '../../services/user-default-view.service';
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
  constructor(private authService: AuthService,
    private router: Router,
    private userDefaultViewService: UserDefaultViewService) { }

  ngOnInit() {
    // Check if token already exists
    if (this.authService.isLoggedIn()) {
      this.doNavigation();
    }
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
      (res) => {
        this.authService.setSession(res);
        // this.router.navigate(['application']);
        this.doNavigation();
      },
      (error) => {
        console.log(error);
        this.serverOutput = 'Wrong username/password';

      });
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
