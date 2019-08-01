import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { SampleType } from '../models/sampleType';
import { SampleTypeComplexity } from '../models/sampleTypeComplexity';
import { SampleTypeCategory } from '../models/sampleTypeCategory';

@Injectable()
export class SampleTypeService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  sampleTypesUrl = this.apiPrefix + 'api/sample';

  /**
   * This observable is for add new sampletypes to the list
   */
  private newSampleType = new Subject<SampleType>();
  newSampleType$ = this.newSampleType.asObservable();

  /**
   * This observable is for pass the current sample type
   * in the chart creation to the peptide selector and
   * to the chart form
   */
  private selectedSampleType = new Subject<SampleType>();
  selectedSampleType$ = this.selectedSampleType.asObservable();

  public getSamplesTypes(): Observable<SampleType[]> {
    return this.httpClient.get<SampleType[]>(this.sampleTypesUrl);
  }

  public getLowAndHighComplexitySampleTypes(): Observable<SampleType[]> {
    return this.httpClient.get<SampleType[]>(this.sampleTypesUrl + '/noiso');
  }

  public addSampleType(sampleType: SampleType): Observable<SampleType> {
    const json = JSON.stringify(sampleType);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<SampleType>(this.sampleTypesUrl + '/' + sampleType.sampleTypeCategory.apiKey, params, { headers: headers });
  }

  public sendNewSampleTypeToList(sampleType: SampleType): void {
    this.newSampleType.next(sampleType);
  }

  public sendSampleTypeToContextSourceSelector(sampleType: SampleType): void {
    this.selectedSampleType.next(sampleType);
  }

  public makeMainSampleType(sampleTypeCategoryApiKey: string, sampleTypeQCCV: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put(this.sampleTypesUrl + '/makemain/' + sampleTypeCategoryApiKey + '/' + sampleTypeQCCV,
      null, { headers: headers });
  }

  public getIsotopologueSampleTypes(): Observable<SampleType[]> {
    return this.httpClient.get<SampleType[]>(this.sampleTypesUrl + '/type/' +
      SampleTypeComplexity[SampleTypeComplexity.HIGHWITHISOTOPOLOGUES]);
  }

  /**
   * Get the default sample type per sample type category
   * @param sampleTypeCategory the sample type category
   */
  public getDefaultSampleTypeBySampleTypeCategory(sampleTypeCategory: SampleTypeCategory): Observable<SampleType> {
    return this.httpClient.get<SampleType>(this.sampleTypesUrl + '/main/' + sampleTypeCategory.apiKey);
  }

}
