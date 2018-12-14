import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Annotation } from '../models/annotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private httpClient: HttpClient) { }

  headers = new HttpHeaders().set('Content-type', 'application/json');

  private apiPrefix = environment.apiPrefix;

  annotationUrl = this.apiPrefix + 'api/troubleshooting/annotation';

  public addAnnotation(annotation: Annotation): Observable<Annotation> {
    const json = JSON.stringify(annotation);
    return this.httpClient.post<Annotation>(this.annotationUrl, json, {headers: this.headers});
  }

}
