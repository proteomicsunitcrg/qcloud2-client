import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../services/system.service';
import { System } from '../../models/system';
declare var M: any;

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private lsService: SystemService) { }

  allLs: System[] = [];

  ngOnInit() {
    this.lsService.getSystems().subscribe(
      res => this.allLs = res.filter(item => item.active),
      err => console.error(err)
    );
  }

  open(item): void {
    const elem = document.getElementById(item);
    const instance = M.Collapsible.init(elem);
  }

}
