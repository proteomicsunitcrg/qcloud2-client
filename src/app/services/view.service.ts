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
import { LayoutInformation } from '../models/layoutInformation';

@Injectable()
export class ViewService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;  
  defaultViewsUrl= this.apiPrefix+'api/views/default';

  /**
   * This observable is for pass a CV to the 
   * chart list in order to create the layouts
   * It is used in the viewBuilder module
   */
  private selectedCV = new Subject<CV>();
  selectedCV$ = this.selectedCV.asObservable();

  public sendCVToChartLayoutList(cv: CV): void {
    this.selectedCV.next(cv);
  }

  /**
   * This observable is for manage the deletion
   * of rows in the view builder
   */
  private deletedRow = new Subject<LayoutInformation>();
  deletedRow$ = this.deletedRow.asObservable();

  public sendDeletedRowToList(deletedRow: LayoutInformation): void {
    this.deletedRow.next(deletedRow);
  }


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
