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
  
  dataSourceUrl= this.apiPrefix+'api/sample';

  samplesTypes: SampleType[] = [];

  public loadSamplesTypes():void {
    this.httpClient.get<SampleType[]>(this.dataSourceUrl).subscribe(
      (samplesTypes)=> {
        samplesTypes.forEach((sampleType)=> this.samplesTypes.push(sampleType));
      });
  }

  public getSamplesTypes(): SampleType[] {
    return this.samplesTypes;
  }

}
