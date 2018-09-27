import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private parameterService: ParametersService,
    private ref: ChangeDetectorRef) { }

  newParam: Param = new Param(null, '', '', '', '', null);

  isFors: String[] = [];

  processors: String[] = [];

  ngOnInit() {
    this.getTypes();
    this.getProcessors();
  }

  private enableSelect(selectId: string): void {
    this.refresh();
    const elem = document.getElementById(selectId);
    M.FormSelect.init(elem, {});
  }

  private refresh(): void {
    const self = this;
    self.ref.detectChanges();
  }

  /**
   * Get the types for the params. Those types are the extended
   * classes of the context_source class in the backend.
   */
  private getTypes(): void {
    this.parameterService.getTypeList()
      .subscribe(
        (types) => {
          this.isFors = types;
        }, err => console.log(err),
        () => {
          this.enableSelect('selectFor');
          this.enableSelect('isZeroNoDataSelect');
        }
      );
  }

  private getProcessors(): void {
    this.parameterService.getProcessors()
      .subscribe(
        (processors) => {
          processors.forEach(processor => this.processors.push(processor));
        }, err => console.log(err),
        () => this.enableSelect('selectProcessor')
      );
  }

  onSubmit(): void {
    this.parameterService.addNewParam(this.newParam)
      .subscribe(
        (result) => {
          // Send to list
          M.toast({ html: 'Parameter saved!' });
          this.parameterService.sendParamToList(result);
          // Reset selectors
          this.newParam = new Param(null, '', '', '', '', true);
          this.enableSelect('selectProcessor');
          this.enableSelect('selectFor');
          this.enableSelect('isZeroNoDataSelect');
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
