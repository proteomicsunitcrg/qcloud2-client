import { Component, OnInit, Input } from '@angular/core';
import { Annotation } from '../../../../models/annotation';
import { ProblemService } from '../../../../services/problem.service';
import { TroubleshootingParentService } from '../../../../services/troubleshooting-parent.service';
import { TroubleShootingParent } from '../../../../models/troubleShootingParent';
import { delay } from 'q';
import { Problem } from '../../../../models/problem';
import { Action } from '../../../../models/action';
declare var M: any;
@Component({
  selector: 'app-annotation-selector-problems',
  templateUrl: './annotation-selector-problems.component.html',
  styleUrls: ['./annotation-selector-problems.component.css']
})
export class AnnotationSelectorProblemsComponent implements OnInit {

  constructor(private problemService: ProblemService, private parentService: TroubleshootingParentService) { }

  @Input() annotation: Annotation;

  parentActions: TroubleShootingParent[];

  selectedParent: TroubleShootingParent = new TroubleShootingParent(null, null, null, null, null, null, null);

  parentChildProblems: Problem[];

  selectedProblem: Problem;

  problem: Problem = new Problem(null, null, null, null, null, []);

  related: Action[] = [];
  relatedSelected: Action[] = [];

  currentDropdownInstance: any = null;

  currentStatus: string = null;

  dropDownDefaultId = 'dropDownParent';



  ngOnInit() {
    this.loadParentsWithActions();
  }

  private loadParentsWithActions(): void {
    this.parentService.getAllParentsWithProblems().subscribe(
      res => {
        console.log(res);
        this.parentActions = res;
      },
      err => {
        console.error(err);
      }
    )
  }

  public addProblem(child: Problem): void {
    this.parentService.sendItemsToList('problem', child);
  }


}
