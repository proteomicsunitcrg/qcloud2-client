import { Component, OnInit } from '@angular/core';
import { Param } from '../../../models/param';
import { ParametersService } from '../../../services/parameters.service';
@Component({
  selector: 'app-parameters-form',
  templateUrl: './parameters-form.component.html',
  styleUrls: ['./parameters-form.component.css']
})
export class ParametersFormComponent implements OnInit {

  constructor(private parameterService: ParametersService) { }

  newParam: Param = new Param(null,'');

  ngOnInit() {
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
