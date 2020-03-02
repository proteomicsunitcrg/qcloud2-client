import { Component, OnInit, Input } from '@angular/core';
import { Annotation } from '../../../../models/annotation';
import { ProblemService } from '../../../../services/problem.service';
import { TroubleshootingParentService } from '../../../../services/troubleshooting-parent.service';
import { TroubleShootingParent } from '../../../../models/troubleShootingParent';
import { delay } from 'q';
import { Action } from '../../../../models/action';
declare var M: any;
@Component({
  selector: 'app-annotation-selector-actions',
  templateUrl: './annotation-selector-actions.component.html',
  styleUrls: ['./annotation-selector-actions.component.css']
})
export class AnnotationSelectorActionsComponent implements OnInit {

  constructor(private problemService: ProblemService, private parentService: TroubleshootingParentService) { }

  @Input() annotation: Annotation;

  parentActions: TroubleShootingParent[];

  selectedParent: TroubleShootingParent = new TroubleShootingParent(null,null,null,null,null,null,null);

  action: Action

  parentChildActions: Action[];


  currentDropdownInstance: any = null;

  currentStatus: string = null;

  dropDownDefaultId = 'dropDownParentAction';

  ngOnInit() {
    this.loadParentsWithActions();    
  }

  private loadParentsWithActions(): void {
    this.parentService.getAllParentsWithActions().subscribe(
      res => {
        console.log(res);
        this.parentActions = res;
      },
      err => {
        console.error(err);
      }
    )
  }

  public addAction(action: Action): void {
    this.parentService.sendItemsToList('action', [action]);
  }
  
  public addParent(parent: TroubleShootingParent): void {
    this.parentService.sendItemsToList('parent', [parent]);
  }

}
