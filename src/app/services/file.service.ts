import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { SampleType } from '../models/sampleType';
import { System } from '../models/system';
import { File } from '../models/file';

@Injectable()
export class FileService {

  private apiPrefix = environment.apiPrefix;

  fileUrl = this.apiPrefix + 'api/file';


  constructor(private httpClient: HttpClient) { }

  public getDates(): Observable<any> {
    return this.httpClient.get(this.fileUrl + '/1/58');
  }

  public getLastFileBySampleTypeAndLabSystem(sampleType: SampleType, labSystemApiKey: string): Observable<File> {
    return this.httpClient.get<File>(this.fileUrl + '/' + sampleType.qualityControlControlledVocabulary + '/' + labSystemApiKey);
  }

  public getFileByFilename(filename: string): Observable<File> {
    return this.httpClient.get<File>(this.fileUrl + '/name/' + filename);
  }

}
