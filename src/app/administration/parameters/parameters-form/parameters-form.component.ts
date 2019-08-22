import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Param } from '../../../models/param';
import { ParametersService } from '../../../services/parameters.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../shared/ToastConfig';
declare var M: any;
import { delay } from 'q';
@Component({
  selector: 'app-parameters-form',
  templateUrl: './parameters-form.component.html',
  styleUrls: ['./parameters-form.component.css']
})
export class ParametersFormComponent implements OnInit {

  constructor(
    private parameterService: ParametersService,
    private ref: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

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
          this.toastr.success('Parameter saved', null, TOASTSETTING);
          this.parameterService.sendParamToList(result);
          // Reset selectors
          this.newParam = new Param(null, '', '', '', '', true);
          this.enableSelect('selectProcessor');
          this.enableSelect('selectFor');
          this.enableSelect('isZeroNoDataSelect');
        },
        () => this.toastr.error('Parameter not saved', null, TOASTSETTING)
      );
  }

}
