import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { CV } from '../models/cv';


@Injectable()
export class CvService {

  constructor(private httpClient: HttpClient) { }

  cvUrl= 'api/cv';

  public getAllCV(): Observable<CV[]> {
    return this.httpClient.get<CV[]>(this.cvUrl);    
  }

  public changeEnabled(cvId: number) : Observable<CV> {
    return this.httpClient.put<CV>(this.cvUrl+'/'+cvId,{},{});
  }



  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error || 'Server Error');
  }
}
