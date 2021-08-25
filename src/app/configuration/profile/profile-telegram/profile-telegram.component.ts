import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-telegram',
  templateUrl: './profile-telegram.component.html',
  styleUrls: ['./profile-telegram.component.css']
})
export class ProfileTelegramComponent implements OnInit {

  constructor(private userService: UserService) { }

  telegramURL: string;

  ngOnInit() {
    this.getTelegramURL();
  }

  private getTelegramURL(): void {
    this.userService.getUserTelegramURL().subscribe(
      res => {
        this.telegramURL = res;
      },
      err => console.error(err)
    );
  }

  public resetTelegramCode(): void {
    alert('Method not enabled in demo version');
    return;
    if (confirm('Your telegram password will be reseted and the session of your mobile device will be closed. Are you sure?')) {
      this.userService.resetTelegramCode().subscribe(
        (res) => {
          this.telegramURL = res;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

}
