import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParametersService } from '../../../services/parameters.service';
import { Param } from '../../../models/param';
import { Subscription } from 'rxjs/Subscription';
declare var M: any;

@Component({
  selector: 'app-parameters-list',
  templateUrl: './parameters-list.component.html',
  styleUrls: ['./parameters-list.component.css']
})
export class ParametersListComponent implements OnInit, OnDestroy {

  constructor(private paramService: ParametersService) { }
  editingParameter = false;
  editRow = -1;
  parameterName = '';
  parameters: Param[] = [];

  newParameter$: Subscription;

  ngOnInit() {
    // Load list
    this.loadParameters();
    // Listen for new params
    this.newParameter$ = this.paramService.newParameter$
      .subscribe(
        newParam => this.parameters.push(newParam),
        error => console.log(error)
      )
  }

  ngOnDestroy() {
    this.newParameter$.unsubscribe();
  }

  editParameter(index: number): void {
    this.editingParameter = true;
    this.editRow = index;
    // Storing the original name in case of cancel
    this.parameterName = this.parameters[index].name;
  }

  cancelEditing(param: Param) {
    param.name = this.parameterName;
    this.stopEditing();
  }

  saveParameter(param: Param): void {
    this.paramService.updateParameter(param).subscribe(
      (result) => {
        M.toast({html: 'Parameter saved!'});
      },
      (error) => {
        
      }
    )
    this.stopEditing();
  }

  private stopEditing() {
    this.editingParameter = false;
    this.editRow = -1;
  }

  private loadParameters(): void {
    this.paramService.getAllParams()
      .subscribe(
        (parameters) => {
          parameters.forEach(parameter => this.parameters.push(parameter))
        },
        (error) => {
          console.log(error);
        }
      )
  }



}
