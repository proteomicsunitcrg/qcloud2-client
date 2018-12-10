import { Component, OnInit, Input } from '@angular/core';
import { Troubleshooting } from '../../../../models/troubleshooting';
declare var M: any;

@Component({
  selector: 'app-annotation-list-item',
  templateUrl: './annotation-list-item.component.html',
  styleUrls: ['./annotation-list-item.component.css']
})
export class AnnotationListItemComponent implements OnInit {

  constructor() { }

  @Input() troubleshooting: Troubleshooting;

  @Input() type: string;

  ngOnInit() {

  }

}
