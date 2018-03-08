import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { Chart } from '../models/chart';
import { ChartParam } from '../models/chartParam';

@Injectable()
export class ChartService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  chartUrl= this.apiPrefix+'api/chart';

  public addNewChart(chart: Chart): Observable<Chart> {
    const json = JSON.stringify(chart);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Chart>(this.chartUrl,params,{headers: headers});
  }

  public addChartParamsToChart(chart: Chart, chartParams: ChartParam[]) : Observable<ChartParam[]> {
    const json = JSON.stringify(chartParams);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<ChartParam[]>(this.chartUrl+'/'+chart.id,params,{headers: headers});
  }

}
