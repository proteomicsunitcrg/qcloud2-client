import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  constructor() { }

  showActions = false;

  @Input() problem: string;

  ngOnInit() {
  }
}
