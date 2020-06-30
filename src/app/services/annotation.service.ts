import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';
import { Annotation } from '../models/annotation';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private httpClient: HttpClient) { }

  headers = new HttpHeaders().set('Content-type', 'application/json');

  private apiPrefix = environment.apiPrefix;

  annotationUrl = this.apiPrefix + 'api/troubleshooting/annotation';

  annotations$: Observable<Annotation[]>;

  public addAnnotation(annotation: Annotation): Observable<Annotation> {
    const json = JSON.stringify(annotation);
    return this.httpClient.post<Annotation>(this.annotationUrl, json, { headers: this.headers });
  }

  public getAnnotationsBetweenDates(datesArray: string[], labSystemApiKey: string): void {
    const currentDates = [];
    currentDates[0] = datesArray[0] + 'T00:00:00.000+02:00';
    currentDates[1] = datesArray[1] + 'T23:59:59.000+02:00';
    this.httpClient.get<Annotation[]>(this.annotationUrl + '/dates/' + currentDates[0] + '/' + currentDates[1] + '/' + labSystemApiKey)
      .subscribe(
        (annotations) => {
          if (annotations !== null) {
            this.annotations$ = from([annotations]);
          }
        }
      );
  }

  public getAnnotationByLabSystemApiKeyAndDate(labSystemApiKey: string, date: Date): Observable<Annotation> {
    return this.httpClient.get<Annotation>(this.annotationUrl + '/labsystem/' + labSystemApiKey + '/' + date.toUTCString());
  }

  public deleteAnnotation(annotation: Annotation): Observable<any> {
    return this.httpClient.delete<Annotation>(this.annotationUrl + '/' + annotation.apiKey);
  }

  public updateAnnotation(annotation: Annotation): Observable<Annotation> {
    const json = JSON.stringify(annotation);
    return this.httpClient.put<Annotation>(this.annotationUrl + '/' + annotation.apiKey, json, { headers: this.headers });
  }

  public getPage(pageToRequest: number, numberOfElements: number, selectedLsApiKey: string, startDate: any, endDate: any, troubleshootingName: string): Observable<any>{
    let params = new HttpParams();
    params = params.set('page', pageToRequest.toString()).set('size', numberOfElements.toString()); // paginator options
    params = params.set('lsApiKey', selectedLsApiKey);
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    params = params.set('troubleshootingName', troubleshootingName);
    return this.httpClient.get<any>(`${this.annotationUrl}/getPage`, {params: params});
  }

}
