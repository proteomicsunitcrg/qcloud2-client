import { Component, OnInit } from '@angular/core';
import { Param } from '../../../models/param';
import { ParametersService } from '../../../services/parameters.service';
import * as M from 'materialize-css/dist/js/materialize';
import { delay } from 'q';
@Component({
  selector: 'app-parameters-form',
  templateUrl: './parameters-form.component.html',
  styleUrls: ['./parameters-form.component.css']
})
export class ParametersFormComponent implements OnInit {

  constructor(private parameterService: ParametersService) { }

  newParam: Param = new Param(null,'','');

  isFors: String[] = [];

  ngOnInit() {
    this.getTypes();
  }

  private getTypes(): void {
    this.parameterService.getTypeList()
      .subscribe(
        (types) => {
          types.forEach(type => {
            this.isFors.push(type);
          });
          delay(100).then(()=> this.enableSelect());
        }
      )
  }
  private enableSelect() {
    const elem = document.getElementById('selectFor');
    let instance = M.FormSelect.init(elem, {});    
  }

  onSubmit(): void {
    this.parameterService.addNewParam(this.newParam)
      .subscribe(
        (result) => {
          // Send to list
          this.parameterService.sendParamToList(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }



}
