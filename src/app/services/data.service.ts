import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { MiniData } from '../models/miniData';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  private apiPrefix = environment.apiPrefix;

  dataUrl = this.apiPrefix + 'api/data';

  constructor(private httpClient: HttpClient) { }

  public getTestData(): Observable<any[]> {
    return this.httpClient.get<MiniData[]>(this.dataUrl + '/2018-01-01/2018-01-05/58')
      .map(
        (data) => {
          let dataArray = [];
          data.forEach((row) => {
            if (dataArray[row.fileCreationDate] == undefined) {
              dataArray[row.fileCreationDate] = {}
            }
            if(dataArray[row.fileCreationDate][row.contextSourceName]==undefined) {
              dataArray[row.fileCreationDate][row.contextSourceName] = row.value
            }
            if(dataArray[row.fileCreationDate]['filename']==undefined) {
              dataArray[row.fileCreationDate]['filename']= row.fileFilename;
            }
          });
          return dataArray;
        }
      );
  }

}
