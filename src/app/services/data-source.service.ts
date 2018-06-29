import { Injectable } from '@angular/core';
import { DataSource } from '../models/dataSource';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Category } from '../models/category';
import { GuideSet } from '../models/guideSet';
@Injectable()
export class DataSourceService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  dataSourceUrl = this.apiPrefix + 'api/datasource';

  private dataSourceSource = new Subject<DataSource[]>();

  dataSources$ = this.dataSourceSource.asObservable();

  private categorySource = new Subject<Category>();

  selectedCategory$ = this.categorySource.asObservable();

  private reloaderDataSourceList = new Subject<boolean>();
  reloaderDataSourceList$ = this.reloaderDataSourceList.asObservable();

  /**
   * This observable is for show the default plots
   * on the main page
   */
  private selectedDataSourceForDisplay = new Subject<DataSource>();
  selectedDataSourceForDisplay$ = this.selectedDataSourceForDisplay.asObservable();

  public reloadDataSourceList(): void {
    this.reloaderDataSourceList.next(true);
  }

  public addNewDataSource(dataSource: DataSource): Observable<DataSource[]> {
    const json = JSON.stringify(dataSource);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.dataSourceUrl, params, {headers: headers, observe: 'response'})
      .catch(this.errorHandler);
  }

  public getDataSourceByApikey(dataSourceApikey: string): Observable<DataSource> {
    return this.httpClient.get<DataSource>(this.dataSourceUrl + '/' + dataSourceApikey);
  }
  /**
   * Get the list of data sources by the current node user.
   * There is no need of node identification because it is getted
   * by the token at the server
   * @param category The category to look for
   */
  public getDataSourcesByCategory(category: Category): Observable<DataSource[]> {
    return this.httpClient.get<any>(this.dataSourceUrl + '/category/' + category.apiKey);
  }

  public addDataSourceToArray(dataSource: DataSource[]) {
    this.dataSourceSource.next(dataSource);
  }

  public setCurrentCategory(category: Category) {
    this.categorySource.next(category);
  }

  public deleteDataSource(dataSource: DataSource): Observable<DataSource[]> {
    return this.httpClient.delete<any>(this.dataSourceUrl + '/' + dataSource.apiKey, {});
  }

  public updateDataSource(dataSource: DataSource): Observable<DataSource> {
    const json = JSON.stringify(dataSource);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<DataSource>(this.dataSourceUrl, params, { headers: headers});
  }

  public getAllNodeDataSources(): Observable<DataSource[]> {
    return this.httpClient.get<DataSource[]>(this.dataSourceUrl);
  }

  public selectDataSourceForDisplay(dataSource: DataSource): void {
    this.selectedDataSourceForDisplay.next(dataSource);
  }

  public saveGuideSet(dataSource: DataSource, guideSet: GuideSet): Observable<DataSource> {
    const json = JSON.stringify(guideSet);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<DataSource>(this.dataSourceUrl + '/guideset/' + dataSource.apiKey, params, {headers: headers});
  }

  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error || 'Server Error');

  }

}
