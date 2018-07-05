import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { Chart } from '../models/chart';
import { ChartParam } from '../models/chartParam';
import { CV } from '../models/cv';
import { SampleType } from '../models/sampleType';

@Injectable()
export class ChartService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  chartUrl = this.apiPrefix + 'api/chart';

  /**
   * This observable is for change the tab
   * on the chart component
   */
  private currentTab = new Subject<string>();
  selectedTab$ = this.currentTab.asObservable();

  /**
   * This subscription is for edit a chart
   */
  private chartToEdit = new Subject<Chart>();
  chartToEdit$ = this.chartToEdit.asObservable();

  public addNewChart(chart: Chart): Observable<Chart> {
    const json = JSON.stringify(chart);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Chart>(this.chartUrl, params, {headers: headers});
  }
  /**
   * Save or update a chart into the database
   * @param chart the chart to save/update
   * @param update true if it is an update, false if is a new one
   */
  public chartToDatabase(chart: Chart, update: boolean): Observable<Chart> {
    const json = JSON.stringify(chart);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    if (update) {
      return this.httpClient.put<Chart>(this.chartUrl, params, {headers: headers});
    } else {
      return this.httpClient.post<Chart>(this.chartUrl, params, {headers: headers});
    }
  }
  /**
   * Add the chart params of a chart into the database
   * @param chart the chart
   * @param chartParams the params
   * @param update true if it is an update, false if is a new one
   */
  public chartParamsToDatabase(chart: Chart, chartParams: ChartParam[], update: boolean): Observable<ChartParam[]> {
    const json = JSON.stringify(chartParams);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    if (update) {
      return this.httpClient.put<ChartParam[]>(this.chartUrl + '/' + chart.apiKey, params, { headers: headers});
    } else {
      return this.httpClient.post<ChartParam[]>(this.chartUrl + '/' + chart.apiKey, params, { headers: headers});
    }
  }

  /**
   * Get all charts
   */
  public getAllCharts(): Observable<Chart[]> {
    return this.httpClient.get<Chart[]>(this.chartUrl);
  }
  /**
   * Get all the charts by cv
   * @param cv cv of the charts to retrieve
   */
  public getChartsByCV(cv: CV): Observable<Chart[]> {
    return this.httpClient.get<Chart[]>(this.chartUrl + '/cv/' + cv.cvid);
  }

  public getChartsByCVAndSampleTypeCategoryApiKey(cv: CV, sampleTypeCategoryApiKey: string): Observable<Chart[]> {
    return this.httpClient.get<Chart[]>(this.chartUrl + '/cv/' + cv.id + '/category/' + sampleTypeCategoryApiKey);
  }

  /**
   * Used for switch between tabs
   * @param tab the tab
   */
  public selectTab(tab: string): void {
    this.currentTab.next(tab);
  }
  /**
   * Send a chart
   * @param chart
   */
  public sendChartToEdit(chart: Chart): void {
    this.chartToEdit.next(chart);
  }

  public getChartsByCVAndSampleType(cv: CV, sampleType: SampleType): Observable<Chart[]> {
    return this.httpClient.get<Chart[]>(this.chartUrl + '/cv/' + cv.cvid + '/' + sampleType.qualityControlControlledVocabulary);
  }

}
