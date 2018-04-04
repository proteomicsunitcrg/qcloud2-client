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

  open(item) : void {
    var elem = document.getElementById(item);
    var instance = M.Collapsible.init(elem);
  }

}
