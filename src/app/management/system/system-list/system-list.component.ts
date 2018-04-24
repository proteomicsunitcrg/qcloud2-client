import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.css']
})
export class SystemListComponent implements OnInit {

  constructor(private systemService: SystemService) { }

  nodeSystems: System[] = [];

  ngOnInit() {
    this.loadSystems();
    this.subscribeToNewSystems();
  }

  private subscribeToNewSystems(): void {
    this.systemService.addedSystem$
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
