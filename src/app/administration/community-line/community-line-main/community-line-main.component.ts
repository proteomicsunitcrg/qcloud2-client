import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-line-main',
  templateUrl: './community-line-main.component.html',
  styleUrls: ['./community-line-main.component.css']
})
export class CommunityLineMainComponent implements OnInit {

  constructor() { }
  // True: show the new editor, false hide it
  newCommunityLine = false;
  editId: String;

  ngOnInit() {
  }

  /**
   * Sets newCommunityLine to true to show the new form
   */
  open($event): void {
    this.editId = $event;
    this.newCommunityLine = true;
  }
  /**
   * Sets newCommunityLine to false to hide the new form
   */
  close(): void {
    this.newCommunityLine = false;
  }

}
