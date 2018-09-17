import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuideSet } from '../models/guideSet';
import { GuideSetPeptideStatus } from '../models/guideSetPeptideStatus';

@Injectable({
  providedIn: 'root'
})
export class GuideSetService {

  private apiPrefix = environment.apiPrefix;
  private guideSetUrl = this.apiPrefix + 'api/guideset';

  private selectedGuideSetPeptideStatus = new Subject<GuideSetPeptideStatus[]>();
  selectedGuideSetPeptideStatus$ = this.selectedGuideSetPeptideStatus.asObservable();

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

  public checkNumberOfFilesInGuideSet(labSystemApiKey: string, guideSet: GuideSet): Observable<GuideSetPeptideStatus[]> {
    return this.httpClient.get<GuideSetPeptideStatus[]>(this.guideSetUrl + '/checkfiles/' + labSystemApiKey
      + '/' + guideSet.startDate + '/' + guideSet.endDate + '/' + guideSet.sampleType.qualityControlControlledVocabulary);
  }

  public setAutomaticGuideSet(guideSet: GuideSet): Observable<GuideSet> {
    const json = JSON.stringify(guideSet);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<GuideSet>(this.guideSetUrl + '/automatic', params, { headers: headers });
  }

  public selectGuideSetPeptideStatus(guideSetPeptideStatus: GuideSetPeptideStatus[]): void {
    this.selectedGuideSetPeptideStatus.next(guideSetPeptideStatus);
  }

  public sendIsValidGuideSet(isValid: boolean): void {
    this.isValidGuideSet.next(isValid);
  }

}
