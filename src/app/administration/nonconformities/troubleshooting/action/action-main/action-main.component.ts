import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../../../../services/action.service';
import { Action } from '../../../../../models/action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-main',
  templateUrl: './action-main.component.html',
  styleUrls: ['./action-main.component.css']
})
export class ActionMainComponent implements OnInit {

  constructor(private actionService: ActionService, private route: Router) { }

  allActions: Action[];

  ngOnInit() {
    this.getAllActions();
  }

  private getAllActions(): void {
    this.actionService.getAllActions().subscribe(
      res => {
        console.log(res);
        
        this.allActions = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  public newAction(): void {
    this.route.navigate([`application/administration/troubleshooting/actionbuilder`, 'new']);
  }

  public edit(apiKey: string): void {
    this.route.navigate([`application/administration/troubleshooting/actionbuilder`, apiKey]);
  }

}
