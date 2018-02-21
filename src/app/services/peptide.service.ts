import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Peptide } from '../models/peptide';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { ContextSource } from '../models/contextSource';
import { ContextSourceCategory } from '../models/contextSourceCategory';

@Injectable()
export class PeptideService {

  constructor(private httpClient: HttpClient) { }

  private contextSourceSource = new Subject<ContextSourceCategory>();

  selectedContextSource$ = this.contextSourceSource.asObservable();

  private apiPrefix = environment.apiPrefix;

  peptideUrl= this.apiPrefix+'api/contextsource/peptide';

  public addPeptide(peptide: Peptide): Observable<Peptide> {
    const json = JSON.stringify(peptide);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.peptideUrl, params, {headers: headers})
      .catch(this.errorHandler);
  }

  public getPeptides(): Observable<Peptide[]> {
    return this.httpClient.get<Peptide[]>(this.peptideUrl);
  }

  public changeSelectedContextSourceCategory(contextSource: ContextSourceCategory): void {
    this.contextSourceSource.next(contextSource);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
