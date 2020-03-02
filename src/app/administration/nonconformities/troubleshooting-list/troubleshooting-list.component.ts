import { Component, OnInit, Input } from '@angular/core';
import { ProblemService } from '../../../services/problem.service';
import { Troubleshooting } from '../../../models/troubleshooting';
import { TroubleshootingType } from '../../../models/troubleshootingType';
import { ActionService } from '../../../services/action.service';

@Component({
  selector: 'app-troubleshooting-list',
  templateUrl: './troubleshooting-list.component.html',
  styleUrls: ['./troubleshooting-list.component.css']
})
export class TroubleshootingListComponent implements OnInit {

  constructor(private problemService: ProblemService, private actionService: ActionService) { }

  troubles: Troubleshooting[] = [];

  @Input() troubleshootingType: TroubleshootingType;

  ngOnInit() {
    // load current problems    
    this.loadTrouble();
  }

  private loadTrouble(): void {
    if (this.troubleshootingType === 'problem') {
      this.loadProblems();
    } else if (this.troubleshootingType === 'action') {
      this.loadActions();
    }
  }

  private loadProblems(): void {
    this.problemService.getAllProblems()
      .subscribe(
        (problems) => {
          problems.forEach(p => this.troubles.push(p));          
        }
      );
  }

  private loadActions(): void {
    this.actionService.getAllActions()
      .subscribe(
        (actions) => {
          actions.forEach(p => this.troubles.push(p));
        }
      );
  }

  onSaved(troubleshooting: Troubleshooting): void {
    this.troubles.push(troubleshooting);
  }

}
