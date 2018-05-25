import { Component, OnInit } from '@angular/core';
import { Param } from '../../../models/param';
import { ParametersService } from '../../../services/parameters.service';
declare var M: any;
import { delay } from 'q';
@Component({
  selector: 'app-parameters-form',
  templateUrl: './parameters-form.component.html',
  styleUrls: ['./parameters-form.component.css']
})
export class ParametersFormComponent implements OnInit {

  constructor(private parameterService: ParametersService) { }

  newParam: Param = new Param(null, '', '', '');

  isFors: String[] = [];

  processors: String[] = [];

  ngOnInit() {
    this.getTypes();
    this.getProcessors();
  }

  /**
   * Get the types for the params. Those types are the extended
   * classes of the context_source class in the backend.
   */
  private getTypes(): void {
    this.parameterService.getTypeList()
      .subscribe(
        (types) => {
          types.forEach(type => {
            this.isFors.push(type);
          });
          delay(100).then(() => this.enableSelect());
        }
      );
  }

  private getProcessors(): void {
    this.parameterService.getProcessors()
      .subscribe(
        (processors) => {
          processors.forEach(processor => this.processors.push(processor));
        }
      );
      delay(100).then(() => this.enableSelect());
  }



  private enableSelect() {
    let elem = document.getElementById('selectFor');
    let instance = M.FormSelect.init(elem, {});
    elem = document.getElementById('selectProcessor');
    instance = M.FormSelect.init(elem, {});
  }

  onSubmit(): void {
    this.parameterService.addNewParam(this.newParam)
      .subscribe(
        (result) => {
          // Send to list
          M.toast({html: 'Parameter saved!'});
          this.parameterService.sendParamToList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
