import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { SampleType } from '../models/sampleType';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SampleTypeService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;  
  sampleTypesUrl= this.apiPrefix+'api/sample';

  /**
   * This observable is for add new sampletypes to the list
   */
  private newSampleType = new Subject<SampleType>();
  newSampleType$ = this.newSampleType.asObservable();

  /**
   * This observable is for pass the current sample type
   * in the chart creation to the peptide selector
   */
  private selectedSampleType = new Subject<SampleType>();
  selectedSampleType$ = this.selectedSampleType.asObservable();

  public getSamplesTypes(): Observable<SampleType[]> {
    return this.httpClient.get<SampleType[]>(this.sampleTypesUrl);
  }

  public addSampleType(sampleType: SampleType): Observable<SampleType> {
    const json = JSON.stringify(sampleType);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<SampleType>(this.sampleTypesUrl,params, {headers: headers});
  }

  public sendNewSampleTypeToList(sampleType: SampleType): void {
    this.newSampleType.next(sampleType);
  }

  public sendSampleTypeToContextSourceSelector(sampleType: SampleType): void {
    this.selectedSampleType.next(sampleType);
  }

}
