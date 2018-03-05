import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { ContextSource } from '../models/contextSource';
import { ContextSourceCategory } from '../models/contextSourceCategory';
import { InstrumentSample } from '../models/instrumentSample';

@Injectable()
export class InstrumentSampleService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private isUrl = this.apiPrefix + 'api/contextsource/instrumentsample';

  private newInstrumentSample = new Subject<InstrumentSample>();
  newInstrumentSample$ = this.newInstrumentSample.asObservable();




  public getAllInstrumentSample() : Observable<InstrumentSample[]> {
    return this.httpClient.get<InstrumentSample[]>(this.isUrl);
  }

  public addNewInstrumentSample(instrumentSample: ContextSource): Observable<InstrumentSample> {
    const json = JSON.stringify(instrumentSample);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<InstrumentSample>(this.isUrl,params,{headers: headers});
  }

  public sendInstrumentSampleToList(instrumentSample: InstrumentSample): void {
    this.newInstrumentSample.next(instrumentSample);
  }

}
