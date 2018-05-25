import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { DataSourceService } from '../../../services/data-source.service';
import { DataSource } from '../../../models/dataSource';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
declare var M: any;
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  systems: System[] = [];

  constructor(private authService: AuthService,
    private systemService: SystemService) { }

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

}
