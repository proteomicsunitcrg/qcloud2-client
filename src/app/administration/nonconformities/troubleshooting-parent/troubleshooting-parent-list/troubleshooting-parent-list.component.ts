import { Component, OnInit } from '@angular/core';
import { TroubleshootingParentService } from '../../../../services/troubleshooting-parent.service';
import { TroubleShootingParent } from '../../../../models/troubleShootingParent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-troubleshooting-parent-list',
  templateUrl: './troubleshooting-parent-list.component.html',
  styleUrls: ['./troubleshooting-parent-list.component.css']
})
export class TroubleshootingParentListComponent implements OnInit {

  constructor(private parentService: TroubleshootingParentService, private router: Router) { }

  troubleshootingParents: TroubleShootingParent[] = [];
  ngOnInit() {
    this.getAllParents();
  }

  private getAllParents(): void {
    this.parentService.getAllParents().subscribe(
      res => {
        console.log(res);
        this.troubleshootingParents = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  public goToParent(parent: TroubleShootingParent): void {
    this.router.navigate(['/application/administration/troubleshooting/parent', parent.apiKey])
    
  }


}
