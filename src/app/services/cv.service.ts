import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { CV } from '../models/cv';
import { Category } from '../models/category';
import { environment } from '../../environments/environment';


@Injectable()
export class CvService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  cvUrl = this.apiPrefix + 'api/cv';

  /**
   * This observable is used for the new chart form
   * it will send to the form the currently selected
   * cv
   */
  private selectedChartCv = new Subject<CV>();
  selectedChartCv$ = this.selectedChartCv.asObservable();

  private newCv = new Subject<CV>();
  newCv$ = this.newCv.asObservable();

  public getAllCV(): Observable<CV[]> {
    return this.httpClient.get<CV[]>(this.cvUrl);
  }

  public getCvByCvId(cvId: string): Observable<CV> {
    return this.httpClient.get<CV>(this.cvUrl + '/' + cvId);
  }
  public getAllEnabledCVByCategory(category: Category): Observable<CV[]> {
    return this.httpClient.get<CV[]>(this.cvUrl + '/category/' + category.apiKey + '/enabled');
  }

  public changeEnabled(cvId: string): Observable<CV> {
    return this.httpClient.put<CV>(this.cvUrl + '/' + cvId, {}, {});
  }
  public getCvByCategory(category: Category): Observable<CV[]> {
    return this.httpClient.get<CV[]>(this.cvUrl + '/category/' + category.apiKey);
  }

  public sendSelectedCvToChartForm(cv: CV): void {
    this.selectedChartCv.next(cv);
  }

  public sendNewCvToList(cv: CV): void {
    this.newCv.next(cv);
  }

  public addNewCv(cv: CV): Observable<CV> {
    const json = JSON.stringify(cv);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<CV>(this.cvUrl + '/category/apikey/' + cv.category.apiKey, params, {headers: headers});
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error || 'Server Error');
  }
}
