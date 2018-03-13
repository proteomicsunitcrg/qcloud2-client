import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { Display } from '../models/display';
import { Chart } from '../models/chart';
import { CV } from '../models/cv';
import { View } from '../models/view';

@Injectable()
export class ViewService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;  
  defaultViewsUrl= this.apiPrefix+'api/views/default';

  public getDefaultViewNameByCV(cv: CV): Observable<View> {
    return this.httpClient.get<View>(this.defaultViewsUrl+'/'+cv.id)
      .map(
        (res) => {
          let view: View = new View(res['viewId'],res['viewName'],null);
          return view;
        }
      );
  }


  public getDefaultByCV(cv: CV): Observable<Display> {
    return this.httpClient.get<any>(this.defaultViewsUrl+'/view/'+cv.id)
      .map(
        (res) => {          
          let charts: Chart[][] = [];
          res.forEach(
            (chart) => {
              if(charts[chart['row']] == undefined) {
                charts[chart['row']] = [];
              }
              charts[chart['row']][chart['col']] = chart;
            }
          )
          return new Display(charts);
        }
      );
  }

}
