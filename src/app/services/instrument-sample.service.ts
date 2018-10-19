import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContextSource } from '../models/contextSource';
import { InstrumentSample } from '../models/instrumentSample';

@Injectable()
export class InstrumentSampleService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private isUrl = this.apiPrefix + 'api/contextsource/instrumentsample';

  private newInstrumentSample = new Subject<InstrumentSample>();
  newInstrumentSample$ = this.newInstrumentSample.asObservable();

  private selectedInstrumentSample = new Subject<InstrumentSample>();
  selectedInstrumentSample$ = this.selectedInstrumentSample.asObservable();

  public getAllInstrumentSample(): Observable<InstrumentSample[]> {
    return this.httpClient.get<InstrumentSample[]>(this.isUrl);
  }

  public addNewInstrumentSample(instrumentSample: ContextSource): Observable<InstrumentSample> {
    const json = JSON.stringify(instrumentSample);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<InstrumentSample>(this.isUrl, params, {headers: headers});
  }

  public sendInstrumentSampleToList(instrumentSample: InstrumentSample): void {
    this.newInstrumentSample.next(instrumentSample);
  }

  public sendInstrumentSampleToEdit(instrumentSample: InstrumentSample): void {
    this.selectedInstrumentSample.next(instrumentSample);
  }

}
