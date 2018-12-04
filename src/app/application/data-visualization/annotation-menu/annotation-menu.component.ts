import { Component, OnInit, AfterViewInit } from '@angular/core';
import { delay } from 'q';
declare var M: any;

@Component({
  selector: 'app-annotation-menu',
  templateUrl: './annotation-menu.component.html',
  styleUrls: ['./annotation-menu.component.css']
})
export class AnnotationMenuComponent implements OnInit, AfterViewInit {

  constructor() { }

  tempProblems = ['Decrease of MS1 signal',
    'MS1 signal fluctuation', 'No signal in MS1',
    'Loss of MS1 signal in the central part of the chromatogram'];

  tempCauses = ['Sample carry over', 'Air bubble in QC vial'];

  tempActions = ['Add more controls between samples', 'Eliminate the air buble'];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.enableSelects();
  }

  private enableSelects(): void {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

}
