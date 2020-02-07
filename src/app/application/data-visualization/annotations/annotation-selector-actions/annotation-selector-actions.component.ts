import { Component, OnInit, Input } from '@angular/core';
import { Annotation } from '../../../../models/annotation';
import { ProblemService } from '../../../../services/problem.service';
import { TroubleshootingParentService } from '../../../../services/troubleshooting-parent.service';
import { TroubleShootingParent } from '../../../../models/troubleShootingParent';
import { delay } from 'q';
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

  ngOnInit() {
    this.loadParentsWithActions();    
  }

  // private loadProblems(): void {
  //   this.prob.getAllTroubleshootingByType(this.troubleshootingType)
  //     .subscribe(
  //       (troubleshootings) => {
  //         troubleshootings.forEach(p => {
  //           if (p.active) {
  //             this.troubleshootings.push(p);
  //           }
  //         });
  //       }, err => console.log('load ts', err), () => this.enableSelects()
  //     );
  // }

  private loadParentsWithActions(): void {
    this.parentService.getAllParentsWithActions().subscribe(
      res => {
        console.log(res);
        this.parentActions = res;
        this.enableSelects();
      },
      err => {
        console.error(err);
      }
    )
  }

  public updateList(): void {
    console.log(this.selectedParent);
    this.enableSelects();
    
  }

  private enableSelects(): void {
    delay(100).then(
      () => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
      }
    );
  }

}
