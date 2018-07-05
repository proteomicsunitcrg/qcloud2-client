import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { SampleComposition} from '../models/sampleComposition';
import { Peptide } from '../models/peptide';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { SampleType } from '../models/sampleType';

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
   * This observable is used in the sample type management list
   * It's function is to select the peptides inside a given sampletype
   */
  private sampleTypeSelector = new Subject<SampleType>();
  currentSampleType$ = this.sampleTypeSelector.asObservable();

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

  public getAllSampleComposition(): Observable<SampleComposition[]> {
    return this.httpClient.get<SampleComposition[]>(this.sampleCompositionUrl);
  }

  public getSampleCompositionByPeptide(peptide: Peptide): Observable<SampleComposition[]> {
    return this.httpClient.get<SampleComposition[]>(this.sampleCompositionUrl + '/peptide/' + peptide.sequence);
  }

  public sendPeptideSampleComposition(sampleCompositions: SampleComposition[]): void {
    this.peptideSampleComposition.next(sampleCompositions);
  }

  public saveSampleComposition(sampleComposition: SampleComposition): Observable<SampleComposition> {
    const json = JSON.stringify(sampleComposition);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<SampleComposition>(this.sampleCompositionUrl, params, {headers: headers});
  }

  public deleteSampleComposiion(sampleComposition: SampleComposition): Observable<any> {
    return this.httpClient.delete(this.sampleCompositionUrl + '/peptide/' +
      sampleComposition.peptide.sequence + '/sample/' + sampleComposition.sampleType.qualityControlControlledVocabulary);
  }

  public getAllPeptidesBySampleType(sampleType: SampleType): Observable<Peptide[]> {
    return this.httpClient.get<Peptide[]>(this.sampleCompositionUrl + '/sample/' + sampleType.name)
      .map((peptides) => {
        const peptideList = [];
        peptides.forEach(peptide => peptideList.push(peptide['peptide']));
        return peptideList;
      });
  }

  public sendSampleTypeToList(sampleType: SampleType): void {
    this.sampleTypeSelector.next(sampleType);
  }

  public getAllPeptidesBySampleTypeQQCV(sampleType: SampleType): Observable<SampleComposition[]> {
    return this.httpClient.get<SampleComposition[]>(this.sampleCompositionUrl + '/qqcv/' + sampleType.qualityControlControlledVocabulary);
  }


}
