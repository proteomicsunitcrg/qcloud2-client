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

  showRelated = false;

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
    if (child.relatedActions.length !== 0) {
      this.showRelated = true;
      this.related = child.relatedActions;
    } else {
      this.showRelated = false;
    }
    this.parentService.sendItemsToList('problem', [child]);
  }

  public addParent(parent: TroubleShootingParent): void {
    this.parentService.sendItemsToList('parent', [parent]);
  }


}
