import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../../../../../services/problem.service';
import { Problem } from '../../../../../models/problem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-main',
  templateUrl: './problem-main.component.html',
  styleUrls: ['./problem-main.component.css']
})
export class ProblemMainComponent implements OnInit {

  constructor(private problemService: ProblemService, private route: Router) { }

  allProblems: Problem[];

  ngOnInit() {
    this.getAllActions();
  }

  private getAllActions(): void {
    this.problemService.getAllProblems().subscribe(
      res => {
        console.log(res);
        
        this.allProblems = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  public newProblem(): void {
    this.route.navigate([`application/administration/troubleshooting/problembuilder`, 'new']);
  }

  public edit(apiKey: string): void {
    this.route.navigate([`application/administration/troubleshooting/problembuilder`, apiKey]);
  }
}
