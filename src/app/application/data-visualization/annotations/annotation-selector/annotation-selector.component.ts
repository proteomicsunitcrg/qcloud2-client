import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { Troubleshooting } from '../../../../models/troubleshooting';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { delay } from 'q';
declare var M: any;

@Component({
  selector: 'app-annotation-selector',
  templateUrl: './annotation-selector.component.html',
  styleUrls: ['./annotation-selector.component.css']
})
export class AnnotationSelectorComponent implements OnInit, AfterViewInit {

  constructor(private troubleshootingService: TroubleshootingService) { }

  troubleshootings: Troubleshooting[] = [];

  @Input() troubleshootingType: TroubleshootingType;

  selectedTroubleshooting: any;


  ngOnInit() {
    this.loadProblems();
  }

  ngAfterViewInit() {
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

  private loadProblems(): void {
    this.troubleshootingService.getAllTroubleshootingByType(this.troubleshootingType)
      .subscribe(
        (troubleshootings) => {
          troubleshootings.forEach(p => this.troubleshootings.push(p));
        }, err => console.log('load ts', err), () => this.enableSelects()
      );
  }

  updateList(): void {
    this.troubleshootingService.sendItemsToList(this.troubleshootingType, this.selectedTroubleshooting);
  }
}
