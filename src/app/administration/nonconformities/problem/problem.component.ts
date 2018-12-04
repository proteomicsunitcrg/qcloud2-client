import { Component, OnInit, Input } from '@angular/core';
import { Troubleshooting } from '../../../models/troubleshooting';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  constructor() { }

  showActions = false;


  @Input() problem: Troubleshooting;

  ngOnInit() {
  }

  doEdit(): void {
    console.log('edit');
  }

  doDelete(): void {
    console.log('delete');
  }
}
