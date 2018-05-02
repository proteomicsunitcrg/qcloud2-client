import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.css']
})
export class SystemListComponent implements OnInit,OnDestroy {

  constructor(private systemService: SystemService) { }

  nodeSystems: System[] = [];

  addedSystem$: Subscription;

  ngOnInit() {
    this.loadSystems();
    this.subscribeToNewSystems();
  }
  
  ngOnDestroy() {
    this.addedSystem$.unsubscribe();
  }

  private subscribeToNewSystems(): void {
    this.addedSystem$ = this.systemService.addedSystem$
      .subscribe((system)=> this.loadSystems())
  }

  private loadSystems(): void {
    this.nodeSystems = [];
    this.systemService.getSystems()
      .subscribe(
        (systems)=> {
          systems.forEach(
            (system) => {
              this.nodeSystems.push(system);
            });
        });
  }

  onGoView(system: System): void {
    this.systemService.selectSystem(system);
  }

}
