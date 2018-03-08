import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { ChartParam } from '../models/chartParam';

@Injectable()
export class ChartParamsService {

  constructor() { }

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

}
