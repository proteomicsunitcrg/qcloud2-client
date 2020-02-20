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
        this.enableDropdonws();
      },
      err => {
        console.error(err);
      }
    )
  }

  private enableDropdonws(): void {
    delay(100).then(
      () => {
        const elems = document.querySelectorAll('.dropdown-button');
        M.FormSelect.init(elems, {});
      }
    );
  }

  public addProblem(child: Problem): void {
    this.parentService.sendItemsToList('problem', child);
  }

  public open(): void {
    this.currentStatus = "open";
    delay(1).then(
      () => {
        const elem = document.getElementById(this.dropDownDefaultId);
        this.currentDropdownInstance = M.Dropdown.init(elem, { constrainWidth: false, coverTrigger: false, alignment: 'left' });
        this.currentDropdownInstance.open();
      }
    );
  }

  public openChild(childs: Problem[], parentApiKey: string): void {
    this.parentChildProblems = childs;
    delay(1).then(
      () => {
        const elem = document.getElementById(parentApiKey);
        this.currentDropdownInstance = M.Dropdown.init(elem, { constrainWidth: false, coverTrigger: false, alignment: 'left' });
        this.currentDropdownInstance.open();
      }
    );
  }

  public closeAlertList(): void {
    this.currentStatus = null;
    const elem = document.getElementById(this.dropDownDefaultId);
    this.currentDropdownInstance = M.Dropdown.init(elem, { constrainWidth: false, coverTrigger: false, alignment: 'left' });
    this.currentDropdownInstance.close();
  }


}
