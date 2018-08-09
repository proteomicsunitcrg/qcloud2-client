import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { System } from '../models/system';
import { Observable, Subject } from 'rxjs';
import { ThresholdNonConformity } from '../models/thresholdNonConformity';

@Injectable({
  providedIn: 'root'
})
export class ThresholdNonConformityService {

  private apiPrefix = environment.apiPrefix;

  thresholdNonConformityUrl = this.apiPrefix + 'api/thresholdnonconformity';

  selectedLabSystem = new Subject<System>();
  selectedLabSystem$ = this.selectedLabSystem.asObservable();

  constructor(private httpClient: HttpClient) { }


  public sendSelectedLabSystemToList(labSystem: System): void {
    this.selectedLabSystem.next(labSystem);
  }

  /**
   * Get threshold non conformities by lab system.
   * @param labSystem
   * @param page
   */
  public getThresholdNonConformitiesByLabSystem(labSystem: System, page: number): Observable<HttpResponse<ThresholdNonConformity[]>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<ThresholdNonConformity[]>(this.thresholdNonConformityUrl + '/' + labSystem.apiKey + '/' + page, {observe: 'response'});
  }
}
