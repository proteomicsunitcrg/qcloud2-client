import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SampleTypeCategory } from '../models/sampleTypeCategory';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SampleTypeCategoryService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  private sampleTypeCategoryUrl = this.apiPrefix + 'api/samplecategory';

  /**
   * Get all the sample type categories from the database
   */
  public findAll(): Observable<SampleTypeCategory[]> {
    return this.httpClient.get<any[]>(this.sampleTypeCategoryUrl);
  }

  public findComplexities(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.sampleTypeCategoryUrl + '/complexities');
  }

  /**
   * Save the provided sample type category into the database
   * @param sampleTypeCategory
   */
  public saveSampleTypeCategory(sampleTypeCategory: SampleTypeCategory): Observable<HttpResponse<any>> {
    const json = JSON.stringify(sampleTypeCategory);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<SampleTypeCategory>(this.sampleTypeCategoryUrl, params, { headers: headers, observe: 'response' });
  }

  public getSampleTypeCategoryById(sampleTypeCategoryId: number): Observable<SampleTypeCategory> {
    return this.httpClient.get<SampleTypeCategory>(this.sampleTypeCategoryUrl + '/' + sampleTypeCategoryId);
  }

}
