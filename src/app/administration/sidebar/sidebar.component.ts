import { Component, OnInit } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open(item): void {
    const elem = document.getElementById(item);
    const instance = M.Collapsible.init(elem);
  }

}
