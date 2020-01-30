import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';
declare var M: any;
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, OnDestroy {

  systems: System[] = [];

  userViews: View[] = [];

  constructor(private authService: AuthService,
    private systemService: SystemService,
    private viewService: ViewService,
    private route: Router) { }

  isAdmin = false;
  isManager = false;

  newUserView$: Subscription;

  ngOnInit() {
    if (this.authService.checkIfAdmin()) {
      this.isAdmin = true;
    }
    if (this.authService.checkRole('ROLE_MANAGER')) {
      this.isManager = true;
    }
    this.loadNodeSystems();
    this.loadUserViews();
    this.subscribeToNewUserView();
  }

  ngOnDestroy() {
    this.newUserView$.unsubscribe();
  }

  private loadUserViews(): void {
    this.userViews = [];
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
    const instance = M.Dropdown.init(elem, { constrainWidth: false, alignment: 'bottom', coverTrigger: false, hover: false });
    instance.open();
  }

  openMobile(): void {
    const elems = document.getElementById('mobile-demo');
    const instances = M.Sidenav.init(elems, {});
  }

  doLogout(): void {
    this.authService.logout();

  }

  public goToHomePage(): void {
    if (this.isAdmin) {
      this.route.navigate(['/application/intranet/files', ]);
    } else {
      this.route.navigate(['/application', ]);
    }
  }

  private subscribeToNewUserView(): void {
    this.newUserView$ = this.viewService.newUserView$
      .subscribe(
        (any) => {
          this.loadUserViews();
        }
      );
  }

  public isXmas() {
    const today = Date.parse(new Date().toString());
    const from = Date.parse('12/15/' + new Date().getFullYear());
    const to = Date.parse('06/01/' + new Date().getFullYear() + 1);
    if ((today <= to && today >= from)) {
      return true;
    }
    return false;
  }

}
