import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Peptide } from '../models/peptide';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { ContextSource } from '../models/contextSource';
import { ContextSourceCategory } from '../models/contextSourceCategory';
import { InstrumentSample } from '../models/instrumentSample';


@Injectable()
export class ContextSourceService {

  constructor(private httpClient: HttpClient) { }

  private contextSourceCategorySource = new Subject<ContextSourceCategory>();

  selectedContextSourceCategory$ = this.contextSourceCategorySource.asObservable();

  private contextSourceSource = new Subject<ContextSource>();

  newContextSource$ = this.contextSourceSource.asObservable();

  private selectedContextSource = new Subject<ContextSource>();

  selectedContextSource$ = this.selectedContextSource.asObservable();

  private apiPrefix = environment.apiPrefix;
  /**
   * As the categories of context sources are extensions from contextsource class
   * they are hard coded here.
   * If you add a new category you should enable the api endpoints at the server
   * and add the corresponding url in contextSourceUrls object bellow
   */
  private contextSourcesCategories = [
    new ContextSourceCategory('peptide', 'Peptide'),
    new ContextSourceCategory('isample', 'Instrument sample')
  ];

  private contextSourceUrls = {
    'peptide': this.apiPrefix + 'api/contextsource/peptide',
    'isample': this.apiPrefix + 'api/contextsource/instrumentsample'
  };

  private currentSelectedContextSourceCategory: ContextSourceCategory = this.contextSourcesCategories[0];

  peptideUrl = this.apiPrefix + 'api/contextsource/peptide';
  instrumentSampleUrl = this.apiPrefix + 'api/contextsource/instrumentsample';


  public getContextSourcesByCategory(contextSourceCategory: ContextSourceCategory): Observable<any> {
    return this.httpClient.get(this.contextSourceUrls[contextSourceCategory.code]);
  }

  public sendNewContextSource(contextSource: ContextSource): void {
    this.contextSourceSource.next(contextSource);
  }

  public addContextSource(contextSource: any, contextSourceCategory: ContextSourceCategory): Observable<any> {
    const json = JSON.stringify(contextSource);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.contextSourceUrls[contextSourceCategory.code], params, { headers: headers })
      .catch(this.errorHandler);
  }

  public getPeptides(): Observable<Peptide[]> {
    return this.httpClient.get<Peptide[]>(this.peptideUrl);
  }

  public changeSelectedContextSourceCategory(contextSource: ContextSourceCategory): void {
    this.currentSelectedContextSourceCategory = contextSource;
    this.contextSourceCategorySource.next(this.currentSelectedContextSourceCategory);
  }

  public getCurrentContextSourceCategory(): ContextSourceCategory {
    return this.currentSelectedContextSourceCategory;
  }

  public getContextSourceCategories(): ContextSourceCategory[] {
    return this.contextSourcesCategories;
  }

  public selectContextSource(contextSource: ContextSource): void {
    this.selectedContextSource.next(contextSource);
  }



  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
