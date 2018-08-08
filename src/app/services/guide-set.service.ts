import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuideSet } from '../models/guideSet';

@Injectable({
  providedIn: 'root'
})
export class GuideSetService {

  private apiPrefix = environment.apiPrefix;
  private guideSetUrl = this.apiPrefix + 'api/guideset';

  constructor(private httpClient: HttpClient) { }

  public updateUserGuideSet(labSystemApiKey: string, guideSet: GuideSet): Observable<GuideSet> {
    const json = JSON.stringify(guideSet);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<GuideSet>(this.guideSetUrl + '/' + labSystemApiKey, params, { headers: headers });
  }

  public getMinFilesForManualGuideSet(): Observable<number> {
    return this.httpClient.get<number>(this.guideSetUrl + '/minmanual');
  }

  public checkNumberOfFilesInGuideSet(labSystemApiKey: string, guideSet: GuideSet): Observable<number> {
    return this.httpClient.get<number>(this.guideSetUrl + '/checkfiles/' + labSystemApiKey
      + '/' + guideSet.startDate + '/' + guideSet.endDate + '/' + guideSet.sampleType.qualityControlControlledVocabulary);
  }

}
