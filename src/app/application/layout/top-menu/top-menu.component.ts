import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';
declare var M: any;
import { Subscription } from 'rxjs';
import { LogoService } from '../../../services/logo.service';
import { Logo } from '../../../models/Logo';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, OnDestroy {

  systems: System[] = [];

  userViews: View[] = [];

  enabledLogo = new Logo(null, null, 'assets/images/logo-qcloud.png', 'QCloud logo', 'QCloud Logo', null);

  constructor(private authService: AuthService,
    private systemService: SystemService,
    private viewService: ViewService,
    private route: Router,
    private logoService: LogoService) { }

  isAdmin = false;
  isManager = false;

  newUserView$: Subscription;

  ngOnInit() {
    this.getLogo();
    if (this.authService.checkIfAdmin()) {
      this.isAdmin = true;
    }
    if (this.authService.checkRole('ROLE_MANAGER')) {
      this.isManager = true;
    }
    this.loadNodeSystems();
    this.loadUserViews();
    this.loadNodeViews();
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

  private loadNodeViews(): void {
    this.viewService.getNodeViews().subscribe(
      res => {
        this.userViews = this.userViews.concat(res);
      }, 
      err => {
        console.error(err);
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

  private getLogo(): void {
    this.logoService.getEnabledLogo().subscribe(
      res => {
        this.enabledLogo = res;
      },
      err => {
        console.log('Logo not found');
      }
    );
  }

}
