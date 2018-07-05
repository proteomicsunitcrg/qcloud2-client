import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Node } from '../models/node';
import { Observable, } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http/src/response';
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
    return this.http.post<any>(this.nodeUrl, params, {headers: headers})
      .catch(this.errorHandler);
  }

  public getToS(): Observable<any> {
    return this.http.get('assets/documents/newAccount.txt', {responseType: 'text'});
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

}
