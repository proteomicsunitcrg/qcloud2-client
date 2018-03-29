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
import { ViewDisplay } from '../models/viewDisplay';

@Injectable()
export class ViewService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;  
  defaultViewsUrl= this.apiPrefix+'api/views/default';

  public getDefaultViewNameByCV(cv: CV): Observable<View> {
    return this.httpClient.get<View>(this.defaultViewsUrl+'/'+cv.id)
      .map(
        (res) => {
          return res;
        }
      );
  }
  public getDefaultViewNameByCVId(cvId: string) {
    return this.httpClient.get<View>(this.defaultViewsUrl+'/'+cvId)
      .map(
        (res) => {
          return res;
        }
      );
  }

  public getDefaultDisplayByView(view: View): Observable<Display> {
    return this.httpClient.get<any>(this.defaultViewsUrl+'/view/'+view.id)
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

  public addDefaultView(view: View): Observable<View> {
    const json = JSON.stringify(view);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<View>(this.defaultViewsUrl,params, {headers: headers});
  }

  public addLayoutToDefaultView(viewDisplay: ViewDisplay[][]): Observable<ViewDisplay[]> {
    let layout = [];
    viewDisplay.forEach(
      (row)=> {
        row.forEach(
          (col) => {
            layout.push(col);
          }
        )
      }
    )
    const json = JSON.stringify(layout);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<ViewDisplay[]>(this.defaultViewsUrl+'/layout',params, {headers: headers});
    
  }

  public getDefaultViews(): Observable<View[]> {
    return this.httpClient.get<View[]>(this.defaultViewsUrl);
  }

}
