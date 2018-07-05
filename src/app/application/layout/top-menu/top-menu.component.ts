import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';
declare var M: any;
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  systems: System[] = [];

  userViews: View[] = [];

  constructor(private authService: AuthService,
    private systemService: SystemService,
    private viewService: ViewService) { }

  isAdmin = false;
  isManager = false;

  ngOnInit() {
    if (this.authService.checkIfAdmin()) {
      this.isAdmin = true;
    }
    if (this.authService.checkRole('ROLE_MANAGER')) {
      this.isManager = true;
    }
    this.loadNodeSystems();
    this.loadUserViews();
  }

  private loadUserViews(): void {
    this.viewService.getUserViews()
      .subscribe(
        (views) => {
          this.userViews = views;
        }
      );
  }

  private loadNodeSystems(): void {
    this.systemService.getSystems()
      .subscribe(
        (systems) => {
          this.systems = systems;
        }
      );
  }

  open(dropdown): void {
    const elem = document.getElementById(dropdown);
    const instance = M.Dropdown.init(elem, {constrainWidth: false});
    instance.open();
  }

  openMobile(): void {
    const elems = document.getElementById('mobile-demo');
    const instances = M.Sidenav.init(elems, {});
  }

}
