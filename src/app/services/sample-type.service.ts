import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { SampleType } from '../models/sampleType';

@Injectable()
export class SampleTypeService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  
  sampleTypesUrl= this.apiPrefix+'api/sample';

  public getSamplesTypes(): Observable<SampleType[]> {
    return this.httpClient.get<SampleType[]>(this.sampleTypesUrl);
  }

}
