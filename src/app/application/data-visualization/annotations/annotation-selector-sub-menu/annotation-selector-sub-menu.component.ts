import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Troubleshooting } from '../../../../models/troubleshooting';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';

@Component({
  selector: 'app-annotation-selector-sub-menu',
  templateUrl: './annotation-selector-sub-menu.component.html',
  styleUrls: ['./annotation-selector-sub-menu.component.css']
})
export class AnnotationSelectorSubMenuComponent implements OnInit {


  @Input() items: any[];
  @ViewChild('buildMenu', { static: true }) public buildMenu;

  constructor(private troubleService: TroubleshootingService) { }

  ngOnInit() {
  }

  public addTroubleshooting(trouble: Troubleshooting): void {
    this.troubleService.sendItemsToList(trouble);
  }

}
