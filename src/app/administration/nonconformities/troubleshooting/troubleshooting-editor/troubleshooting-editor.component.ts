import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../../shared/ToastConfig';
import { Troubleshooting } from '../../../../models/troubleshooting';

@Component({
  selector: 'app-troubleshooting-editor',
  templateUrl: './troubleshooting-editor.component.html',
  styleUrls: ['./troubleshooting-editor.component.css']
})
export class TroubleshootingEditorComponent implements OnInit {

  constructor(private activeRouter: ActivatedRoute, private troubleshootingService: TroubleshootingService,
    private toast: ToastrService, private router: Router) { }

  trouble: Troubleshooting;

  ngOnInit() {
    this.activeRouter.params.subscribe(
      params => {
        if (params.apiKey !== null && params.apiKey !== undefined) {
          this.retrieveInfo(params.apiKey);
        }
      }
    );
  }

  private retrieveInfo(apiKey: string): void {
    this.troubleshootingService.getTroubleshootingByApiKey(apiKey).subscribe(
      res => {
        this.trouble = res;
      },
      err => {
        this.toast.error('Error retrieving the action', 'ERROR', TOASTSETTING);
      }
    );
  }

  public update(): void {
    console.log(this.trouble);
    this.troubleshootingService.updateTroubleshooting(this.trouble).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

  public goBack(): void {
    this.router.navigate(['/application/administration/troubleshooting'])
  }

  public goToRelations(): void {
    this.router.navigate(['/application/administration/troubleshooting/relation', this.trouble.apiKey]);
  }

}
