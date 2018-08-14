import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { System } from '../models/system';
import { Observable, Subject } from 'rxjs';
import { ThresholdNonConformity } from '../models/thresholdNonConformity';
import { SampleType } from '../models/sampleType';

@Injectable({
  providedIn: 'root'
})
export class ThresholdNonConformityService {

  private apiPrefix = environment.apiPrefix;

  thresholdNonConformityUrl = this.apiPrefix + 'api/thresholdnonconformity';

  selectedLabSystem = new Subject<System>();
  selectedLabSystem$ = this.selectedLabSystem.asObservable();

  selectedSampleType = new Subject<SampleType>();
  selectedSampleType$ = this.selectedSampleType.asObservable();

  selectedThresholdNonConformity = new Subject<ThresholdNonConformity>();
  selectedThresholdNonConformity$ = this.selectedThresholdNonConformity.asObservable();

  constructor(private httpClient: HttpClient) { }

  public sendSelectedThresholdNonConformity(thnc: ThresholdNonConformity): void {
    this.selectedThresholdNonConformity.next(thnc);
  }

  public sendSelectedLabSystemToList(labSystem: System): void {
    this.selectedLabSystem.next(labSystem);
  }

  public sendSelectedSampleTypeToList(sampleType: SampleType): void {
    this.selectedSampleType.next(sampleType);
  }

  /**
   * Get threshold non conformities by lab system.
   * @param labSystem
   * @param page
   */
  public getThresholdNonConformitiesByLabSystem(labSystem: System, page: number): Observable<HttpResponse<ThresholdNonConformity[]>> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<ThresholdNonConformity[]>(this.thresholdNonConformityUrl + '/' + labSystem.apiKey + '/' + page, { observe: 'response' });
  }

  /**
   * Get the threshold non conformities by lab system and sample type
   * @param labSystem
   * @param sampleType
   * @param page
   */
  public getThresholdNonConformitiesByLabSystemAndSampleType(labSystem: System,
    sampleType: SampleType, page: number): Observable<HttpResponse<ThresholdNonConformity[]>> {

    return this.httpClient.get<ThresholdNonConformity[]>(this.thresholdNonConformityUrl + '/' +
      labSystem.apiKey + '/' + sampleType.qualityControlControlledVocabulary + '/' + page, { observe: 'response' });
  }
}
