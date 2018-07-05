import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Display } from '../models/display';
import { Chart } from '../models/chart';
import { CV } from '../models/cv';
import { View } from '../models/view';
import { ViewDisplay } from '../models/viewDisplay';

@Injectable()
export class ViewService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  defaultViewsUrl = this.apiPrefix + 'api/views/default';
  userViewsUrl = this.apiPrefix + 'api/views/user';

  public getDefaultViewNameByCV(cv: CV): Observable<View> {
    return this.httpClient.get<View>(this.defaultViewsUrl + '/' + cv.id)
      .map(
        (res) => {
          return res;
        }
      );
  }
  public getDefaultViewNameByCVAndSampleTypeCategory(cv: CV, sampleTypeCategoryId: number): Observable<View> {
    return this.httpClient.get<View>(this.defaultViewsUrl + '/' + cv.id + '/' + sampleTypeCategoryId)
      .map(
        (res) => {
          return res;
        }
      );
  }

  public getUserViewByApiKey(apiKey: string): Observable<View> {
    return this.httpClient.get<View>(this.userViewsUrl + '/' + apiKey);
  }

  public getDefaultViewNameByCVAndSampleTypeCategoryApiKey(cv: CV, sampleTypeCategoryApiKey: string): Observable<View> {
    return this.httpClient.get<View>(this.defaultViewsUrl + '/' + cv.id + '/' + sampleTypeCategoryApiKey)
      .map(
        (res) => {
          return res;
        }
      );
  }

  public getDefaultViewsByCVId(cvId: string): Observable<View[]> {
    return this.httpClient.get<View[]>(this.defaultViewsUrl + '/' + cvId);
  }

  public getDefaultDisplayByView(view: View): Observable<Display> {
    return this.httpClient.get<any>(this.defaultViewsUrl + '/view/' + view.apiKey)
      .map(
        (res) => {
          const charts: Chart[][] = [];
          res.forEach(
            (chart) => {
              if (charts[chart['row']] === undefined) {
                charts[chart['row']] = [];
              }
              charts[chart['row']][chart['col']] = chart;
            }
          );
          return new Display(charts);
        }
      );
  }

  public getUserDisplayByView(view: View): Observable<Display> {
    return this.httpClient.get<any>(this.userViewsUrl + '/view/' + view.apiKey)
      .map(
        (res) => {
          const charts: Chart[][] = [];
          res.forEach(
            (chart) => {
              if (charts[chart['row']] === undefined) {
                charts[chart['row']] = [];
              }
              charts[chart['row']][chart['col']] = chart;
            }
          );
          return new Display(charts);
        }
      );
  }

  public addDefaultView(view: View): Observable<View> {
    const json = JSON.stringify(view);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<View>(this.defaultViewsUrl, params, {headers: headers});
  }

  public updateDefaultView(view: View): Observable<View> {
    const json = JSON.stringify(view);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<View>(this.defaultViewsUrl, params, {headers: headers});
  }

  public addUserView(view: View): Observable<View> {
    const json = JSON.stringify(view);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<View>(this.userViewsUrl, params, {headers: headers});
  }

  public updateUserView(view: View): Observable<View> {
    const json = JSON.stringify(view);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<View>(this.userViewsUrl, params, {headers: headers});
  }

  public updateLayoutToDefaultView(viewDisplay: ViewDisplay[][], viewApiKey: string): Observable<ViewDisplay[]> {
    const layout = [];
    viewDisplay.forEach(
      (row) => {
        row.forEach(
          (col) => {
            layout.push(col);
          }
        );
      }
    );
    const json = JSON.stringify(layout);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<ViewDisplay[]>(this.defaultViewsUrl + '/layout/' + viewApiKey, params, {headers: headers});
  }

  public updateLayoutToUserView(viewDisplay: ViewDisplay[][], viewApiKey: string): Observable<ViewDisplay[]> {
    const layout = [];
    viewDisplay.forEach(
      (row) => {
        row.forEach(
          (col) => {
            layout.push(col);
          }
        );
      }
    );
    const json = JSON.stringify(layout);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<ViewDisplay[]>(this.userViewsUrl + '/layout/' + viewApiKey, params, {headers: headers});
  }

  public addLayoutToDefaultView(viewDisplay: ViewDisplay[][]): Observable<ViewDisplay[]> {
    const layout = [];
    viewDisplay.forEach(
      (row) => {
        row.forEach(
          (col) => {
            layout.push(col);
          }
        );
      }
    );
    const json = JSON.stringify(layout);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<ViewDisplay[]>(this.defaultViewsUrl + '/layout', params, {headers: headers});
  }

  public addLayoutToUserView(viewDisplay: ViewDisplay[][]): Observable<ViewDisplay[]> {
    const layout = [];
    viewDisplay.forEach(
      (row) => {
        row.forEach(
          (col) => {
            layout.push(col);
          }
        );
      }
    );
    const json = JSON.stringify(layout);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<ViewDisplay[]>(this.userViewsUrl + '/layout', params, {headers: headers});
  }

  public getDefaultViews(): Observable<View[]> {
    return this.httpClient.get<View[]>(this.defaultViewsUrl);
  }

  public getUserViews(): Observable<View[]> {
    return this.httpClient.get<View[]>(this.userViewsUrl);
  }

}
