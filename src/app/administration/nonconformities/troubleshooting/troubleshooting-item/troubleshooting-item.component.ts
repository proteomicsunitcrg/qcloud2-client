import { Component, OnInit, Input } from '@angular/core';
import { Troubleshooting } from '../../../../models/troubleshooting';

@Component({
  selector: 'app-troubleshooting-item',
  templateUrl: './troubleshooting-item.component.html',
  styleUrls: ['./troubleshooting-item.component.css']
})
export class TroubleshootingItemComponent implements OnInit {


  @Input() troubleshooting: Troubleshooting;

  constructor() { }

  ngOnInit() {
    // console.log(this.troubleshooting);

  }

}
