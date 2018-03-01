import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { SampleComposition} from '../models/sampleComposition';
import { Peptide } from '../models/peptide';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

@Injectable()
export class SampleCompositionService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  private sampleCompositionUrl = this.apiPrefix + 'api/samplecomposition';


  /**
   * One component will ask to another component to fill an array
   * with the sample compositions
   * peptideSelector and sampleCompositionSelector belongs to the
   * form process: add / edit peptide and its sample types
   */
  private peptideSelector = new Subject<Peptide>();
  currentPeptide$ = this.peptideSelector.asObservable();

  private sampleCompositionSelector = new Subject<SampleComposition[]>();
  currentSampleComposition$ = this.sampleCompositionSelector.asObservable();

  /**
   * This observables are for load the sample composition of a given
   * peptide.
   */
  private peptideSampleComposition = new Subject<SampleComposition[]>();
  peptideSampleComposition$ = this.peptideSampleComposition.asObservable();

  public sendSampleComposition(sampleComposition: SampleComposition[]): void {
    this.sampleCompositionSelector.next(sampleComposition);
  }

  public sendPeptide(peptide: Peptide): void {
    this.peptideSelector.next(peptide);
  }

  public getAllSampleComposition() : Observable<SampleComposition[]> {
    return this.httpClient.get<SampleComposition[]>(this.sampleCompositionUrl);
  }

  public getSampleCompositionByPeptide(peptide: Peptide) : Observable<SampleComposition[]> {
    return this.httpClient.get<SampleComposition[]>(this.sampleCompositionUrl+'/peptide/'+peptide.id);
  }

  public sendPeptideSampleComposition(sampleCompositions : SampleComposition[]) : void {
    this.peptideSampleComposition.next(sampleCompositions);
  }

  public saveSampleComposition(sampleComposition: SampleComposition): Observable<SampleComposition> {
    const json = JSON.stringify(sampleComposition);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<SampleComposition>(this.sampleCompositionUrl,params, {headers: headers});
  }


}
