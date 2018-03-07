import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../../../services/parameters.service';
import { Param } from '../../../models/param';

@Component({
  selector: 'app-chart-param',
  templateUrl: './chart-param.component.html',
  styleUrls: ['./chart-param.component.css']
})
export class ChartParamComponent implements OnInit {

  constructor(private paramService: ParametersService) { }

  parameters: Param[] = [];

  selectedParameter: Param;

  ngOnInit() {
    // Load paratemers
    this.loadParameters();
  }

  private loadParameters(): void {
    this.paramService.getAllParams()
      .subscribe(
        (parameters) => {
          parameters.forEach(parameter => this.parameters.push(parameter))
        });
  }

  selectParameter(param: Param): void {
    this.selectedParameter = param;
    this.paramService.sendParamToContextSourceSelector(this.selectedParameter);
  }


}
