import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GeneralAnnotation } from '../models/GeneralAnnotation';
@Injectable({
  providedIn: 'root'
})
export class GeneralAnnotationService {
  constructor(private httpClient: HttpClient) { }

  // ENV URL
  private apiPrefix = environment.apiPrefix;

  // Email API URL
  generalAnnotationURL = this.apiPrefix + 'api/general-annotation';

  /**
   * @summary Sends a GET petition to the server to get all general annotations
   * @author Marc Serret
   * @since 1.0.0
   * @returns An observable with an array with all general annotations
   * @access public
   */
  public getAllGeneralAnnotations(): Observable<GeneralAnnotation[]> {
    return this.httpClient.get<GeneralAnnotation[]>(this.generalAnnotationURL);
  }

  public saveGeneralAnnotation(annotation: GeneralAnnotation): Observable<GeneralAnnotation> {
    const params = JSON.stringify(annotation);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<GeneralAnnotation>(`${this.generalAnnotationURL}/save`, params, { headers: headers });
  }

  public toggleActive(apiKey: string): Observable<GeneralAnnotation> {
    return this.httpClient.get<GeneralAnnotation>(`${this.generalAnnotationURL}/toggle/${apiKey}`);
  }

  public getAnnotationsBetweenDates(datesArray: string[]): Observable<GeneralAnnotation[]> {
    const currentDates = [];
    currentDates[0] = datesArray[0] + 'T00:00:00.000+02:00';
    currentDates[1] = datesArray[1] + 'T23:59:59.000+02:00';
    return this.httpClient.get<GeneralAnnotation[]>(this.generalAnnotationURL + '/dates/' + currentDates[0] + '/' + currentDates[1]);
  }

  /**
   * deleteGeneralAnnotation
   */
  public deleteGeneralAnnotation(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.generalAnnotationURL}/${id}`);
  }

  /**
   * getGeneralAnnotationById
   */
  public getGeneralAnnotationById(id: number): Observable<GeneralAnnotation> {
    return this.httpClient.get<GeneralAnnotation>(`${this.generalAnnotationURL}/${id}`);
  }

}
