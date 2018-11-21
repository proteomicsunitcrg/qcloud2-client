import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { InstrumentSample } from '../models/instrumentSample';
import { map } from 'rxjs/operators';
import { TraceColor } from '../models/TraceColor';

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
    return this.httpClient.get<InstrumentSample[]>(this.isUrl).pipe(
      map((instrumentSamples) => {
        const instrumentSamplesList: InstrumentSample[] = [];
        instrumentSamples.forEach(
          (is) => {
            instrumentSamplesList.push(new InstrumentSample(is.id, is.name,
              is.abbreviated, is.qCCV, is.apiKey,
              new TraceColor(is.traceColor.mainColor, is.traceColor.apiKey), is.shadeGrade));
          }
        );
        return instrumentSamplesList;
      })
    );
  }

  public addNewInstrumentSample(instrumentSample: InstrumentSample): Observable<InstrumentSample> {
    const json = JSON.stringify(instrumentSample);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<InstrumentSample>(this.isUrl, params, { headers: headers }).pipe(
      map((is) => {
        return new InstrumentSample(is.id, is.name,
          is.abbreviated, is.qCCV, is.apiKey, new TraceColor(is.traceColor.mainColor, is.traceColor.apiKey), is.shadeGrade);
      }));
  }

  public updateInstrumentSample(instrumentSample: InstrumentSample): Observable<InstrumentSample> {
    const json = JSON.stringify(instrumentSample);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<InstrumentSample>(this.isUrl, params, { headers: headers }).pipe(
      map((is) => {
        return new InstrumentSample(is.id, is.name,
          is.abbreviated, is.qCCV, is.apiKey, new TraceColor(is.traceColor.mainColor, is.traceColor.apiKey), is.shadeGrade);
      })
    );
  }

  public sendInstrumentSampleToList(instrumentSample: InstrumentSample): void {
    this.newInstrumentSample.next(instrumentSample);
  }

  public sendInstrumentSampleToEdit(instrumentSample: InstrumentSample): void {
    this.selectedInstrumentSample.next(instrumentSample);
  }

}
