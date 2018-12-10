import { Component, OnInit } from '@angular/core';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
declare var M: any;

@Component({
  selector: 'app-annotation-main',
  templateUrl: './annotation-main.component.html',
  styleUrls: ['./annotation-main.component.css']
})
export class AnnotationMainComponent implements OnInit {

  constructor() { }

  troubleshootingTypesENUM = TroubleshootingType;

  ngOnInit() {
  }

  // returns keys of enum
  troubleshootingTypes(): Array<string> {
    const keys = Object.keys(this.troubleshootingTypesENUM);
    return keys;
  }

}
