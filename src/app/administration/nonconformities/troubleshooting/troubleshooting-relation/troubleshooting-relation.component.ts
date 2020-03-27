import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { ToastrService } from 'ngx-toastr';
import { Troubleshooting } from '../../../../models/troubleshooting';
import { TOASTSETTING, TOASTSETTINGLONG } from '../../../../shared/ToastConfig';
declare var M: any;
@Component({
  selector: 'app-troubleshooting-relation',
  templateUrl: './troubleshooting-relation.component.html',
  styleUrls: ['./troubleshooting-relation.component.css']
})
export class TroubleshootingRelationComponent implements OnInit {

  constructor(private activeRouter: ActivatedRoute, private troubleshootingService: TroubleshootingService,
    private toast: ToastrService, private router: Router) { }

    trouble: Troubleshooting;

    troublesNoParent: Troubleshooting[];

    selectedChild: Troubleshooting;

  ngOnInit() {
    this.activeRouter.params.subscribe(
      params => {
        if (params.apiKey !== null && params.apiKey !== undefined) {
            this.loadChilds(params.apiKey);
            // this.loadTroubleshootingsWithoutParent();
        }
      }
    );
  }

  private loadChilds(apiKey: string): void {
    this.troubleshootingService.getTroubleshootingByApiKey(apiKey).subscribe(
      res => {
        this.trouble = res;
        console.log(res);
        this.loadTroubleshootingsWithoutParent();
      },
      err => {
        console.error(err);
      }
    );
  }

  private loadTroubleshootingsWithoutParent(): void {
    this.troubleshootingService.getByParentNullChildsNullAndType(this.trouble.type).subscribe(
      res => {
        res.forEach((item, index) => {
          if (item.apiKey == this.trouble.apiKey) {
            res.splice(index, 1);
          }
        });
        console.log(res);
        this.troublesNoParent = res;
        setTimeout(() => {  // The timeout is necessary because the checkbox isnt instant
          M.AutoInit();
        }, 100);
      },
      err => {
        console.error(err);
      }
    );
  }

  public goToChild(apiKey: string): void {
    this.router.navigate(['/application/administration/troubleshooting/editor', apiKey]);    
  }

  public unlinkTrouble(child: Troubleshooting): void {
    this.troubleshootingService.unLink(child).subscribe(
      res => {
        this.toast.success('Relation deleted', 'Success', TOASTSETTING);
        this.loadChilds(this.trouble.apiKey);
      },
      err => {
        this.toast.success(err.message, 'Error', TOASTSETTINGLONG);
        console.error(err);
      }
    );
  }

  public linkChild(): void {
    console.log(this.selectedChild);
    this.troubleshootingService.linkChild(this.trouble.apiKey, this.selectedChild).subscribe(
      res => {
        console.log(res);
        this.loadChilds(this.trouble.apiKey);
        this.loadTroubleshootingsWithoutParent();
        this.selectedChild = undefined;
      },
      err => {
        console.error(err);
      }
    );
  }

}
