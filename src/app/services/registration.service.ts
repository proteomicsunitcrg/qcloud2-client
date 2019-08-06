import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Node } from '../models/node';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
/**
 * Service for node registration
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */

@Injectable()
export class RegistrationService {

  private apiPrefix = environment.apiPrefix;

  nodeUrl = this.apiPrefix + 'api/node';

  constructor(private http: HttpClient) { }

  public registerNode(node: Node): Observable<Node> {
    const json = JSON.stringify(node);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(this.nodeUrl, params, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  public getToS(): Observable<any> {
    return this.http.get('assets/documents/newAccount.txt', { responseType: 'text' });
  }

  public getCountries(): Observable<any> {
    return this.http.get('assets/documents/countries.json');
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }

}
