import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-line-main',
  templateUrl: './community-line-main.component.html',
  styleUrls: ['./community-line-main.component.css']
})
export class CommunityLineMainComponent implements OnInit {

  constructor() { }

  newCommunityLine = false;

  ngOnInit() {
  }

  open(): void {
    this.newCommunityLine = true;
  }

}
