import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TraceColor } from '../models/TraceColor';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TraceColorService {

  private apiPrefix = environment.apiPrefix;
  private traceColorUrl = this.apiPrefix + 'api/color';

  constructor(private httpClient: HttpClient) { }

  public addNewTraceColor(traceColor: TraceColor): Observable<any> {
    const json = JSON.stringify(traceColor);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.traceColorUrl, params, { headers: headers });
  }

  public updateTraceColor(traceColor: TraceColor): Observable<any> {
    const json = JSON.stringify(traceColor);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<any>(this.traceColorUrl + '/' + traceColor.apiKey, params, { headers: headers });
  }

  public getAllTraceColors(): Observable<TraceColor[]> {
    return this.httpClient.get<TraceColor[]>(this.traceColorUrl).pipe(
      map((traceColors) => {
        const traceColorList: TraceColor[] = [];
        traceColors.forEach(
          (traceColor) => {
            traceColorList.push(new TraceColor(traceColor.mainColor, traceColor.apiKey));
          }
        );
        return traceColorList;
      })
    );
  }
}
