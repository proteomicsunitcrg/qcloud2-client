import { Component, OnInit, Input } from '@angular/core';
import { NodeIntranetService } from '../../../../services/node-intranet.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-single-node-users',
  templateUrl: './single-node-users.component.html',
  styleUrls: ['./single-node-users.component.css']
})
export class SingleNodeUsersComponent implements OnInit {

  constructor(
    private intranetService: NodeIntranetService,
    private userService: UserService
  ) { }

  @Input('nodeApiKey') nodeApiKey: string;

  ngOnInit() {
  }

  private getUsers(): void {
    this.userService.getUsersByNodeApiKey(this.nodeApiKey).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    );
  }

}
