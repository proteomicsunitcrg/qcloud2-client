import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { EmailService } from '../../../../services/email.service';
import { Email } from '../../../../models/email';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../../shared/ToastConfig';

@Component({
  selector: 'app-single-node-users',
  templateUrl: './single-node-users.component.html',
  styleUrls: ['./single-node-users.component.css']
})
export class SingleNodeUsersComponent implements OnInit {
  usersEnabled = 0;

  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private toast: ToastrService
  ) { }
  @Input('nodeApiKey') nodeKey: string;

  users: User[] = [];

  ngOnInit() {
    this.getUsers();
  }
  
  private getUsers(): void {
    this.userService.getUsersByNodeApiKey(this.nodeKey).subscribe(
      res => {
        this.usersEnabled = res.filter((user: User) => user.enabled).length;
        this.users = res.sort((a, b) => a.enabled < b.enabled ? 1 : -1);
      },
      err => console.error(err)
    );
  }

  public enableDisableUser(apiKey: string): void {
    this.userService.enableDisableUser(apiKey).subscribe(
      () => {
        this.getUsers();
      },
      err => {
        console.error(err);
      }
    );
  }

  public resetPassword(user: User): void {
    this.userService.resetPassword(user.apiKey).subscribe(
      res => {
        if (confirm(`New password ${res}, send email?`)) {
          this.sendEmail(user, res);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  private sendEmail(user: User, password: string): void {
    const users: String[] = [user.email];
    const email = new Email('qcloud@crg.eu', users, 'TEST IGNORE THIS:::::QCloud 2 password change'
      , `<p>Dear QCloud user</p><p>Your passsord has been changed to: <b>${password}</b></p><p>Thanks you</p>`);
    this.emailService.sendEmail(email).subscribe(
      res => {
        if (res) {
          this.toast.success('Email send', null, TOASTSETTING);
        } else {
          this.toast.error('Email not send', null, TOASTSETTING);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  public giveRemoveAdmin(apiKey: string): void {
    this.userService.giveRemoveAdmin(apiKey).subscribe(
      res => {
        this.toast.success(`${res.firstname} upgraded or downgraded`, null, TOASTSETTING);
        this.getUsers();
      },
      err => {
        this.toast.error(err.error.message, err.error.error, TOASTSETTING); //error inception
      }
    );
  }
}
