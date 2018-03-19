import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { ChartParam } from '../models/chartParam';
import { Chart } from '../models/chart';

@Injectable()
export class ChartParamsService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  chartUrl= this.apiPrefix+'api/chart/params';


  /**
   * This observable is used to transport the
   * chart params between the components 
   */
  private chartParamsToFill = new Subject<ChartParam[]>();
  chartParamsToFill$ = this.chartParamsToFill.asObservable();

  public sendChartParamsArrayToFill(chartParamsArray: ChartParam[]): void {
    this.chartParamsToFill.next(chartParamsArray);
  }
    /**
   * This observable is for reset the components
   */
  private resetComponent = new Subject<boolean>();
  resetComponent$ = this.resetComponent.asObservable();

  public resetComponents(): void {
    this.resetComponent.next(true);
  }

  // Estas pasando el parameter pero aún no sabes ni quien lo va a pasar
  // y mucho menos como se va a pasar....
  // Prueba a poner un observable de param aquí a ver si suena la flauta



  public getChartsParamsByChart(chart: Chart): Observable<any[]> {
    return this.httpClient.get<any[]>(this.chartUrl+'/'+chart.id);
  }

}
