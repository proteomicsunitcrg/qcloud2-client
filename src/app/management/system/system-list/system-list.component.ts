import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.css']
})
export class SystemListComponent implements OnInit, OnDestroy {

  constructor(private systemService: SystemService) { }

  nodeSystems: System[] = [];

  realoadSystemList$: Subscription;

  ngOnInit() {
    this.loadSystems();
    // this.subscribeToNewSystems();
    this.subscribeToReloadList();
  }

  ngOnDestroy() {
    this.realoadSystemList$.unsubscribe();
  }

  private subscribeToReloadList(): void {
    this.realoadSystemList$ = this.systemService.reloadSystemList$
      .subscribe(
        () => {
          this.loadSystems();
        }
      );
  }

  private loadSystems(): void {
    this.nodeSystems = [];
    this.systemService.getSystems()
      .subscribe(
        (systems) => {
          systems.forEach(
            (system) => {
              this.nodeSystems.push(system);
            });
            console.log(this.nodeSystems);
        });
  }

  onGoView(system: System): void {
    this.systemService.selectSystem(system);
  }

}
