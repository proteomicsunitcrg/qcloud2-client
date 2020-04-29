import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { Troubleshooting } from '../../../../models/troubleshooting';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-annotation-selector-dropdown',
  templateUrl: './annotation-selector-dropdown.component.html',
  styleUrls: ['./annotation-selector-dropdown.component.css']
})
export class AnnotationSelectorDropdownComponent implements OnInit {

  constructor(private troubleService: TroubleshootingService) { }

  @ViewChild('clickHoverMenuTrigger', null) clickHoverMenuTrigger: MatMenuTrigger;

  @Input() type: string;

  troubles: Troubleshooting[];

  ngOnInit() {
    this.getParentsByType();
  }

  private getParentsByType(): void {
    this.troubleService.getParentsByType(this.type).subscribe(
      res => {
        this.troubles = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  public addTroubleshooting(trouble: Troubleshooting): void {
    this.clickHoverMenuTrigger.closeMenu();
    this.troubleService.sendItemsToList(trouble);
  }
  
  public handleEventCloseMenu(event: boolean): void {
    this.clickHoverMenuTrigger.closeMenu();
  }

}
