import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TroubleshootingParentService } from '../../../../services/troubleshooting-parent.service';
import { TroubleShootingParent } from '../../../../models/troubleShootingParent';
import { ActionService } from '../../../../services/action.service';
import { Action } from '../../../../models/action';
import { ProblemService } from '../../../../services/problem.service';
import { Problem } from '../../../../models/problem';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../../shared/ToastConfig';

declare var M: any;
@Component({
  selector: 'app-troubleshooting-item',
  templateUrl: './troubleshooting-item.component.html',
  styleUrls: ['./troubleshooting-item.component.css']
})
export class TroubleshootingItemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private parentTroubleService: TroubleshootingParentService,
    private actionService: ActionService, private problemService: ProblemService,
    private router: Router, private toast: ToastrService) { }

  troubleParent: TroubleShootingParent = new TroubleShootingParent(null, null, null, null, null, [], []);

  allActions: Action[] = [];

  filteredActions: Action[] = [];

  actionSelected: Action;

  allProblems: Problem[] = [];

  filteredProblems: Problem[] = [];

  problemSelected: Problem;

  isAction: boolean;

  isProblem: boolean;

  new = false;

  apiKey: string;

  ngOnInit() {
    this.loadTroubleParent();
  }

  private loadTroubleParent(): void {
    this.route.params.subscribe(
      (params) => {
        if (params.apiKey !== null && params.apiKey !== undefined) {
          this.apiKey = params.apiKey;
          this.getTroubleParentByApiKey(params.apiKey);
        } else {
          console.log('no api Key');
        }
      });
  }

  private getTroubleParentByApiKey(parentApiKey: string): void {
    this.parentTroubleService.getParentByParentApiKey(parentApiKey).subscribe(
      res => {
        if (res === null) {
          console.log('not found');
        } else {
          console.log(res);
          this.troubleParent = res;
          if (this.troubleParent.action.length === 0 && this.troubleParent.problem.length === 0) {
            console.log('nada');
            this.isAction = false;
            this.isProblem = false;
            this.new = true;
          } if (this.troubleParent.problem.length === 0 && this.troubleParent.action.length !== 0) {
            console.log('action');
            this.isAction = true;
            this.isProblem = false;
          } if (this.troubleParent.action.length === 0 && this.troubleParent.problem.length !== 0) {
            console.log('problem');
            this.isAction = false;
            this.isProblem = true;
          }
          if(this.isAction) {
            this.getAllActions();
          }
          if(this.isProblem) {
            this.getAllProblems();
          }
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  public getAllActions(): void {
    this.actionService.getAllActions().subscribe(
      res => {
        this.allActions = res;
        this.filteredActions = this.allActions.filter(this.comparer(this.troubleParent.action));
        M.AutoInit();
      },
      err => {
        console.error(err);
      }
    )
  }

  public getAllProblems(): void {
    console.log('caca');
    
    this.problemService.getAllProblems().subscribe(
      res => {
        console.log(res);
        
        this.allProblems = res;
        this.filteredProblems = this.allProblems.filter(this.comparer(this.troubleParent.problem));
        M.AutoInit();
      },
      err => {
        console.error(err);
      }
    )
  }

  private comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other.apiKey == current.apiKey && other.id == current.id
      }).length == 0;
    }
  }

  public unlink(apiKey: string, typeOfTrouble: string): void {
    if (typeOfTrouble === 'action') {
      this.parentTroubleService.unlinkAction(apiKey, this.troubleParent.apiKey).subscribe(
        res => {
          this.getTroubleParentByApiKey(this.troubleParent.apiKey);
        },
        err => {
          console.error(err);
        }
      );
    } else if (typeOfTrouble === 'problem'){
      this.parentTroubleService.unlinkProblem(apiKey, this.troubleParent.apiKey).subscribe(
        res => {
          this.getTroubleParentByApiKey(this.troubleParent.apiKey);
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  public addAction(): void {
    this.parentTroubleService.linkAnction(this.actionSelected.apiKey, this.troubleParent.apiKey).subscribe(
      res => {
        this.getTroubleParentByApiKey(this.troubleParent.apiKey);
      },
      err => {
        console.error(err);
      }
    )
  }

  public addProblem(): void {
    this.parentTroubleService.linkProblem(this.problemSelected.apiKey, this.troubleParent.apiKey).subscribe(
      res => {
        this.getTroubleParentByApiKey(this.troubleParent.apiKey);
      },
      err => {
        console.error(err);
      }
    )
  }

  public remove(): void {
    this.parentTroubleService.removeParent(this.troubleParent).subscribe(
      res => {
        if (res) {
          this.toast.success('Deleted', 'Success!', TOASTSETTING);
          this.close();
        } else {
          this.toast.error('Unlink all before this performing action', 'Error', TOASTSETTING);
        }
      },
      err => {
        this.toast.error('ERROR :(((', 'Error', TOASTSETTING);
      }
    );
  }

  public close(): void {
    this.router.navigate(['/application/administration/troubleshooting']);
  }

  public edit(): void {
    this.router.navigate(['/application/administration/troubleshooting/parentbuilder', this.apiKey])
  }

}
