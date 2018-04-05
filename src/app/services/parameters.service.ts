import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { Param } from '../models/param';

@Injectable()
export class ParametersService {

  private apiPrefix = environment.apiPrefix;
  private parameterUrl = this.apiPrefix + 'api/param';

  private newParameter = new Subject<Param>();
  newParameter$ = this.newParameter.asObservable();

  /**
   * This observable is for the chart management
   * it will change the context source section
   */
  private selectedParameter = new Subject<Param>();
  selectedParameter$ = this.selectedParameter.asObservable();
  
  constructor(private httpClient: HttpClient) { }

  public addNewParam(param: Param): Observable<Param> {
    const json = JSON.stringify(param);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Param>(this.parameterUrl,params,{headers: headers});
  }

  public getAllParams(): Observable<Param[]> {
    return this.httpClient.get<Param[]>(this.parameterUrl);
  }

  public sendParamToList(param: Param): void {
    this.newParameter.next(param);
  }

  public updateParameter(param: Param) : Observable<Param> {
    const json = JSON.stringify(param);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<Param>(this.parameterUrl,params,{headers: headers});
  }

  public getTypeList(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.parameterUrl+'/types');
  }

  public sendParamToContextSourceSelector(param: Param): void {
    this.selectedParameter.next(param);
  }

  public getProcessors(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.parameterUrl+'/processors');
  }

}
