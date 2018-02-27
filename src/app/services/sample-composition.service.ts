import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { SampleComposition} from '../models/sampleComposition';
import { Peptide } from '../models/peptide';

@Injectable()
export class SampleCompositionService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  private sampleCompositionUrl = this.apiPrefix + 'api/samplecomposition';

  public getAllSampleComposition() : Observable<SampleComposition[]> {
    return this.httpClient.get<SampleComposition[]>(this.sampleCompositionUrl);
  }

  public getSampleCompositionByPeptide(peptide: Peptide) : Observable<SampleComposition[]> {
    return this.httpClient.get<SampleComposition[]>(this.sampleCompositionUrl+'/peptide/'+peptide.id);
  }

}
