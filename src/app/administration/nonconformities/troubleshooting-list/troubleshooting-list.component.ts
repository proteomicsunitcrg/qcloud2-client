import { Component, OnInit, Input } from '@angular/core';
import { TroubleshootingService } from '../../../services/troubleshooting.service';
import { Troubleshooting } from '../../../models/troubleshooting';
import { TroubleshootingType } from '../../../models/troubleshootingType';

@Component({
  selector: 'app-troubleshooting-list',
  templateUrl: './troubleshooting-list.component.html',
  styleUrls: ['./troubleshooting-list.component.css']
})
export class TroubleshootingListComponent implements OnInit {

  constructor(private troubleshootingService: TroubleshootingService) { }

  problems: Troubleshooting[] = [];

  @Input() troubleshootingType: TroubleshootingType;

  ngOnInit() {
    // load current problems
    this.loadProblems();
  }

  private loadProblems(): void {
    this.troubleshootingService.getAllTroubleshootingByType(this.troubleshootingType)
      .subscribe(
        (problems) => {
          problems.forEach(p => this.problems.push(p));
        }
      );
  }

  onSaved(troubleshooting: Troubleshooting): void {
    this.problems.push(troubleshooting);
  }

}
