import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-profile-unsubscribe',
  templateUrl: './profile-unsubscribe.component.html',
  styleUrls: ['./profile-unsubscribe.component.css']
})
export class ProfileUnsubscribeComponent implements OnInit {

  constructor(private userService: UserService) { }

  subscribed: boolean;

  ngOnInit() {
    this.getSubscribedToMailList();
  }

  public updateSubscribed(): void {
    this.userService.updateSubscribed().subscribe(
      res => {
        this.subscribed = res.spam;
      },
      err => {
        console.error(err);
      }
    );
  }

  private getSubscribedToMailList(): void {
    this.userService.getSubscribedToMailList().subscribe(
      res => {
        console.log(res);
        this.subscribed = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
