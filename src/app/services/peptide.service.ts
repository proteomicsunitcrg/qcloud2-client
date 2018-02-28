import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { Peptide} from '../models/peptide';

@Injectable()
export class PeptideService {
  private apiPrefix = environment.apiPrefix;
  private peptideUrl = this.apiPrefix + 'api/contextsource/peptide';

  private peptideSelector = new Subject<Peptide>();

  selectedPeptide$ = this.peptideSelector.asObservable();

  /**
   * This observable is used for communicate the list
   * with the form.
   */
  private peptidePersist = new Subject<Peptide>();
  peptideFromDb$ = this.peptidePersist.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getAllPeptides(): Observable<Peptide[]> {
    return this.httpClient.get<Peptide[]>(this.peptideUrl);
  }

  public savePeptide(peptide: Peptide) : Observable<Peptide> {
    const json = JSON.stringify(peptide);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Peptide>(this.peptideUrl,params,{headers: headers});
  }

  public sendPeptide(peptide: Peptide) : void {
    this.peptideSelector.next(peptide);
  }

  public sendPeptideToList(peptide: Peptide): void {
    this.peptidePersist.next(peptide);
  }

  public findPeptide(peptide: Peptide): Observable<Peptide> {
    return this.httpClient.get<Peptide>(this.peptideUrl+'/'+peptide.id);
  }
}
