import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SampleType } from '../models/sampleType';
import { File } from '../models/file';
import { System } from '../models/system';

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

  public getSampleTypesByLabSystem(labSystem: System): Observable<SampleType[]> {
   return this.httpClient.get<SampleType[]>(this.fileUrl + '/sampletypes/' + labSystem.apiKey);
  }

}
