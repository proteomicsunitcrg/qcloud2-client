import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Threshold } from '../models/threshold';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThresholdService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private thresholdUrl = this.apiPrefix + 'api/threshold';

  public getAllThresholds(): Observable<Threshold[]> {
    return this.httpClient.get<Threshold[]>(this.thresholdUrl);
  }

  public getAllThresholdTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.thresholdUrl+'/types');
  }

  public getAllThresholdDirections(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.thresholdUrl+'/directions');
  }

  public saveThreshold(threshold: Threshold): Observable<any> {
    const json = JSON.stringify(threshold);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Threshold>(this.thresholdUrl,params,{headers:headers});
  }

}
