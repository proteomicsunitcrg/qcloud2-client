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
      res => this.telegramURL = `https://t.me/vesperon51TestBot?start=${res}`,
      err => console.error(err)
    );
  }

}
