import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-partner-main',
  templateUrl: './community-partner-main.component.html',
  styleUrls: ['./community-partner-main.component.css']
})
export class CommunityPartnerMainComponent implements OnInit {

  constructor() { }

  newCommunityPartner: boolean = false;

  ngOnInit() {
  }

  /**
   * Sets newCommunityLine to true to show the new form
   */
  open(): void {
    this.newCommunityPartner = true;
  }
  /**
   * Sets newCommunityLine to false to hide the new form
   */
  close(): void {
    this.newCommunityPartner = false;
  }
}
