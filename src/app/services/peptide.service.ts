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

  constructor(private httpClient: HttpClient) { }

  public getAllPeptides(): Observable<Peptide[]> {
    return this.httpClient.get<Peptide[]>(this.peptideUrl);
  }
}
