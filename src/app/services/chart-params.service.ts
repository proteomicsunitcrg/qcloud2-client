import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { ChartParam } from '../models/chartParam';
import { Chart } from '../models/chart';
import { ContextSource } from '../models/contextSource';

@Injectable()
export class ChartParamsService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  chartUrl= this.apiPrefix+'api/chart/params';


  /**
   * This observable is used to transport the
   * chart params between the components when a new chart
   * is beign entered
   */
  private chartParamsToFill = new Subject<ChartParam[]>();
  chartParamsToFill$ = this.chartParamsToFill.asObservable();

  public sendChartParamsArrayToFill(chartParamsArray: ChartParam[]): void {
    this.chartParamsToFill.next(chartParamsArray);
  }
    /**
   * This observable is for reset the components
   */
  private resetComponent = new Subject<boolean>();
  resetComponent$ = this.resetComponent.asObservable();

  public resetComponents(): void {
    this.resetComponent.next(true);
  }

  /**
   * This observable is for send the context sources
   * from the database to the edit chart form
   */
  private selectedContextSources = new Subject<ContextSource[]>();
  selectedContextSources$ = this.selectedContextSources.asObservable();
  
  /**
   * Get the context sources from the chart params arrived by
   * function parameter and send it to the context source
   * component in order to edit a chart
   * @param chartParams the chart params from the server
   */
  public sendContextSourcesToEdit(chartParams: ChartParam[]): void {
    let contextSources: ContextSource[] = [];
    chartParams.forEach(
      (chartParam) => contextSources.push(chartParam.contextSource)
    )
    this.selectedContextSources.next(contextSources);
  }



  public getChartsParamsByChart(chart: Chart): Observable<any[]> {
    return this.httpClient.get<any[]>(this.chartUrl+'/'+chart.id);
  }

}
