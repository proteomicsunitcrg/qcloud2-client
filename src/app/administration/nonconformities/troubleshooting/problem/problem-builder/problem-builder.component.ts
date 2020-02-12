import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TOASTSETTING } from 'src/app/shared/ToastConfig';
import { ProblemService } from 'src/app/services/problem.service';
import { Problem } from 'src/app/models/problem';

@Component({
  selector: 'app-problem-builder',
  templateUrl: './problem-builder.component.html',
  styleUrls: ['./problem-builder.component.css']
})
export class ProblemBuilderComponent implements OnInit {

  constructor(private problemService: ProblemService, private activeRouter: ActivatedRoute,
    private toast: ToastrService, private route: Router) { }

  builderForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    qccv: new FormControl('', [
      Validators.required
    ])
  });

  edit = false;

  apiKey: string;

  ngOnInit() {
    this.activeRouter.params.subscribe(
      params => {
        if (params.apiKey !== null && params.apiKey !== undefined) {
          if(params.apiKey !== 'new') {
            this.edit = true;
            this.retrieveInfo(params.apiKey);
            this.apiKey = params.apiKey;
          }
        }
      }
    );
  }

  public save(): void {
    this.problemService.saveProblem(this.constructObject()).subscribe(
      res => {
        this.toast.success('Problem saved', 'Success', TOASTSETTING);
      },
      err => {
        this.toast.error('Error saving problem', 'ERROR', TOASTSETTING);
      }
    );
  }

  public update(): void {
    this.problemService.updateProblem(this.constructObject(), this.apiKey).subscribe(
      res => {
        this.toast.success('Problem updated', 'Success', TOASTSETTING);
      },
      err => {
        this.toast.error('Error updating problem', 'ERROR', TOASTSETTING);
      }
    );
  }

  private retrieveInfo(apiKey: string): void {
    this.problemService.getProblemByApiKey(apiKey).subscribe(
      res => {
        this.mountForm(res);
      }, 
      err => {
        this.toast.error('Error retrieving the problem', 'ERROR', TOASTSETTING);
      }
    );
  }

  private constructObject(): Problem {
    return new Problem(this.builderForm.value.name,
      this.builderForm.value.description, this.builderForm.value.qccv, null, true);
  }

  private mountForm(problem: Problem): void {
    this.builderForm.controls['name'].setValue(problem.name);
    this.builderForm.controls['description'].setValue(problem.description);
    this.builderForm.controls['qccv'].setValue(problem.qccv);
  }

  public goBack(): void {
    this.route.navigate(['application/administration/troubleshooting/problem']);
  }
}
