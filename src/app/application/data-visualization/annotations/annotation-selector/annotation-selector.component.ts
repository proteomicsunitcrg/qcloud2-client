import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { Troubleshooting } from '../../../../models/troubleshooting';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { delay } from 'q';
import { Annotation } from '../../../../models/annotation';
declare var M: any;

@Component({
  selector: 'app-annotation-selector',
  templateUrl: './annotation-selector.component.html',
  styleUrls: ['./annotation-selector.component.css']
})
export class AnnotationSelectorComponent implements OnInit, AfterViewInit, OnChanges {

  constructor(private troubleshootingService: TroubleshootingService) { }

  troubleshootings: Troubleshooting[] = [];

  @Input() troubleshootingType: TroubleshootingType;

  @Input() annotation: Annotation;

  selectedTroubleshooting: Troubleshooting[] = [];


  ngOnInit() {
    this.loadProblems();
  }

  ngAfterViewInit() {
    this.enableSelects();
  }

  ngOnChanges() {
    if (this.annotation !== undefined) {
      this.updateSelector();
    } else {
      this.resetSelector();
    }
  }

  private resetSelector(): void {
    this.selectedTroubleshooting = [];
    this.enableSelects();
  }

  private updateSelector(): void {
    const found = [];
    switch (this.troubleshootingType) {
      case TroubleshootingType.ACTION:
        this.annotation.actions.forEach(
          (action) => {
            found.push(this.troubleshootings.find(ts => ts.apiKey === action.apiKey));
            this.selectedTroubleshooting = found;
          }
        );
        break;
      case TroubleshootingType.PROBLEM:
        this.annotation.problems.forEach(
          (problem) => {
            found.push(this.troubleshootings.find(ts => ts.apiKey === problem.apiKey));
            this.selectedTroubleshooting = found;
          }
        );
        break;
    }
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
          troubleshootings.forEach(p => {
              this.troubleshootings.push(p);
          });
        }, err => console.log('load ts', err), () => this.enableSelects()
      );
  }

  updateList(): void {
    this.troubleshootingService.sendItemsToList(this.troubleshootingType, this.selectedTroubleshooting);
  }

}
