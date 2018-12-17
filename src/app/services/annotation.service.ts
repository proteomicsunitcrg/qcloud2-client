import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';
import { Annotation } from '../models/annotation';

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
    console.log('sending');
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

}
