import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Troubleshooting } from '../../../../models/troubleshooting';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';

@Component({
  selector: 'app-troubleshooting-list',
  templateUrl: './troubleshooting-list.component.html',
  styleUrls: ['./troubleshooting-list.component.css']
})
export class TroubleshootingListComponent implements OnInit {

  constructor(private troubleshootingService: TroubleshootingService, private router: Router) { }

  troubles: Troubleshooting[] = [];

  @Input() troubleshootingType: TroubleshootingType;

  ngOnInit() {
    this.loadAllTroubles();
  }


  onSaved(troubleshooting: Troubleshooting): void {
    this.troubles.push(troubleshooting);
  }

  private loadAllTroubles(): void {
    this.troubleshootingService.getAllTroubleshootingTopParents().subscribe(
      res => {
        console.log(res);
        this.troubles = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  public editTrouble(troubleshooting: Troubleshooting): void {
    this.router.navigate(['/application/administration/troubleshooting/editor/', troubleshooting.apiKey]);
  }

}
