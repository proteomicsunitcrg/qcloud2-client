import { Component, OnInit, Input } from '@angular/core';
import { NodeIntranetService } from '../../../../services/node-intranet.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-single-node-users',
  templateUrl: './single-node-users.component.html',
  styleUrls: ['./single-node-users.component.css']
})
export class SingleNodeUsersComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  @Input('nodeApiKey') nodeApiKey: string;

  users: User[] = [];

  ngOnInit() {
    this.getUsers()
  }

  private getUsers(): void {
    this.userService.getUsersByNodeApiKey(this.nodeApiKey).subscribe(
      res => {
        this.users = res;
      },
      err => console.error(err)
    );
  }

}
