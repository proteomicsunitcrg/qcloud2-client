import { Component, OnInit, Input } from '@angular/core';
import { Troubleshooting } from '../../../models/troubleshooting';
import { TroubleshootingService } from '../../../services/troubleshooting.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../shared/ToastConfig';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  constructor(
    private troubleService: TroubleshootingService,
    private toast: ToastrService
  ) { }

  showActions = false;


  @Input() problem: Troubleshooting;

  ngOnInit() {
  }

  doEdit(): void {
    console.log('edit');
  }

  doDelete(): void {
    console.log('delete');
  }

  public enableDisable(apiKey: string): void {
    this.troubleService.enableDisable(apiKey).subscribe(
      res => {
        this.problem = res;
      },
      err => this.toast.error('Error updating the toast', null, TOASTSETTING)
    );
  }
}
