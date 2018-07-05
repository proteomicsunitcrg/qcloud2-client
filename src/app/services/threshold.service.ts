import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Threshold } from '../models/threshold';
import { Observable } from 'rxjs/Observable';
import { ThresholdParam } from '../models/thresholdParams';
import { ThresholdConstraint } from '../models/thresholdConstraint';
import { PlotThreshold } from '../models/plotThreshold';
import { System } from '../models/system';
import { Chart } from '../models/chart';
import { LabSystemStatus } from '../models/labsystemstatus';

@Injectable()
export class ThresholdService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private thresholdUrl = this.apiPrefix + 'api/threshold';

  public getAllThresholds(): Observable<Threshold[]> {
    return this.httpClient.get<Threshold[]>(this.thresholdUrl);
  }

  public getAllThresholdTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.thresholdUrl + '/types');
  }

  public getAllThresholdDirections(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.thresholdUrl + '/directions');
  }

  public saveThreshold(threshold: Threshold): Observable<any> {
    const json = JSON.stringify(threshold);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Threshold>(this.thresholdUrl + '/' + threshold.thresholdType, params, {headers: headers});
  }

  public saveThresholdParams(thresholdParams: ThresholdParam[]): Observable<any> {
    const json = JSON.stringify(thresholdParams);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<ThresholdParam[]>(this.thresholdUrl + '/params', params, {headers: headers});
  }

  public getThresholdConstraints(thresholdType: string): Observable<ThresholdConstraint> {
    return this.httpClient.get<ThresholdConstraint>(this.thresholdUrl + '/constraints/admin/' + thresholdType);
  }

  public getPlotThreshold(chart: Chart, system: System): Observable<PlotThreshold> {
    return this.httpClient.get<PlotThreshold>(this.thresholdUrl + '/plot/' + chart.apiKey + '/' + system.apiKey);
  }

  public getUserThresholds(): Observable<Threshold[]> {
    return this.httpClient.get<Threshold[]>(this.thresholdUrl + '/node');
  }

  public getAllThresholdsBySystem(labSystem: System): Observable<Threshold[]> {
    return this.httpClient.get<Threshold[]>(this.thresholdUrl + '/node/' + labSystem.apiKey);
  }

  public changeEnabled(thresholdId: number): Observable<any> {
    return this.httpClient.put<number>(this.thresholdUrl + '/switchmonitor/' + thresholdId, {}, { observe: 'response'});
  }

  public updateThresholdParams(thresholdId: number, thresholdParams: ThresholdParam[]): Observable<any> {
    const json = JSON.stringify(thresholdParams);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<number>(this.thresholdUrl + '/' + thresholdId, params, {headers: headers, observe: 'response'});
  }

  public getLabSystemStatus(labSystem: System): Observable<LabSystemStatus[]> {
    return this.httpClient.get<LabSystemStatus[]>(this.thresholdUrl + '/status/' + labSystem.apiKey);
  }

}
