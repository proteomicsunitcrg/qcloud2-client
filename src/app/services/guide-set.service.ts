import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuideSet } from '../models/guideSet';
import { GuideSetContextSourceStatus } from '../models/guideSetContextSourceStatus';
import { Threshold } from '../models/threshold';

@Injectable({
  providedIn: 'root'
})
export class GuideSetService {

  private apiPrefix = environment.apiPrefix;
  private guideSetUrl = this.apiPrefix + 'api/guideset';

  private selectedGuideSetContextSourceStatus = new Subject<GuideSetContextSourceStatus[]>();
  selectedGuideSetContextSourceStatus$ = this.selectedGuideSetContextSourceStatus.asObservable();

  private isValidGuideSet = new Subject<boolean>();
  isValidGuideSet$ = this.isValidGuideSet.asObservable();

  constructor(private httpClient: HttpClient) { }

  public updateUserGuideSet(labSystemApiKey: string, guideSet: GuideSet): Observable<GuideSet> {
    const json = JSON.stringify(guideSet);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<GuideSet>(this.guideSetUrl + '/' + labSystemApiKey, params, { headers: headers });
  }

  public getMinFilesForManualGuideSet(): Observable<HttpResponse<number>> {
    return this.httpClient.get<number>(this.guideSetUrl + '/minmanual', {observe: 'response'});
  }

  public checkNumberOfFilesInGuideSet(labSystemApiKey: string, guideSet: GuideSet): Observable<GuideSetContextSourceStatus[]> {
    return this.httpClient.get<GuideSetContextSourceStatus[]>(this.guideSetUrl + '/checkfiles/' + labSystemApiKey
      + '/' + guideSet.startDate + '/' + guideSet.endDate + '/' + guideSet.sampleType.qualityControlControlledVocabulary);
  }

  public setAutomaticGuideSet(guideSet: GuideSet): Observable<GuideSet> {
    const json = JSON.stringify(guideSet);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<GuideSet>(this.guideSetUrl + '/automatic', params, { headers: headers });
  }

  public selectGuideSetContextSourceStatus(guideSetContextSourceStatus: GuideSetContextSourceStatus[]): void {
    this.selectedGuideSetContextSourceStatus.next(guideSetContextSourceStatus);
  }

  public sendIsValidGuideSet(isValid: boolean): void {
    this.isValidGuideSet.next(isValid);
  }

  // tslint:disable-next-line:max-line-length
  public checkCurrentGuideSet(labSystemApiKey: string, sampleTypeQccv: string, contextSourceApiKey: string): Observable<GuideSetContextSourceStatus> {
    return this.httpClient.get<any>(this.guideSetUrl +
      '/checkguideset/' +
      labSystemApiKey +
      '/' + sampleTypeQccv +
      '/' + contextSourceApiKey);
  }

  resetLabSystemGuideSet(threshold: Threshold): Observable<any> {
    const json = JSON.stringify(threshold);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<Threshold>(this.guideSetUrl + '/reset/' + threshold.labSystem.apiKey, params, {headers: headers});
  }

}
