import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../../../services/parameters.service';
import { Param } from '../../../models/param';
import { ChartParamsService } from '../../../services/chart-params.service';
import { ChartService } from '../../../services/chart.service';
import { Chart } from '../../../models/chart';
import { ChartParam } from '../../../models/chartParam';

/**
 * This component for manage the chart params
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-chart-param',
  templateUrl: './chart-param.component.html',
  styleUrls: ['./chart-param.component.css']
})
export class ChartParamComponent implements OnInit {

  constructor(private paramService: ParametersService,
    private chartParamsService: ChartParamsService,
    private chartService: ChartService) { }

  parameters: Param[] = [];

  selectedParameter: Param = new Param(null,null,null,null);

  ngOnInit() {
    // Load paratemers
    this.loadParameters();
    this.subscribeToReset();
    this.subscribeToChartEdition();
  }

  /**
   * If there is a request for edit an existing chart it will load 
   * its chart params into the list
   */
  private subscribeToChartEdition(): void {
    this.chartService.chartToEdit$
      .subscribe(
        (chart) => {
          this.loadChartParams(chart);
        }
      )
  }
  /**
   * Load the chart params by chart
   * @param chart the chart beign edited
   */
  private loadChartParams(chart: Chart): void {
    this.chartParamsService.getChartsParamsByChart(chart)
      .subscribe(
        (chartParams: ChartParam[]) => {
          this.selectParameter(chartParams[0].param);
        }
      )
  }
  /**
   * Where there is a reset request, ussualy when the form 
   * is submited, it will reset the selected parameter
   */
  private subscribeToReset(): void {
    this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {
          this.selectedParameter = new Param(null,null,null,null);
        }
      )
  }

  /**
   * Get the parameters from the database
   */
  private loadParameters(): void {
    this.paramService.getAllParams()
      .subscribe(
        (parameters) => {
          parameters.forEach(parameter => this.parameters.push(parameter))
        });
  }

  /**
   * Set the selected parameter after the user clicks on 
   * any parameter at the DOM
   * @param param the parameter to select
   */
  selectParameter(param: Param): void {
    this.selectedParameter = param;
    this.paramService.sendParamToContextSourceSelector(this.selectedParameter);
  }


}
