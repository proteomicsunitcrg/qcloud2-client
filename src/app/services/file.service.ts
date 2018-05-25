import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {

  private apiPrefix = environment.apiPrefix;

  fileUrl = this.apiPrefix + 'api/file';


  constructor(private httpClient: HttpClient) { }

  public getDates(): Observable<any> {
    return this.httpClient.get(this.fileUrl + '/1/58');
  }

}
