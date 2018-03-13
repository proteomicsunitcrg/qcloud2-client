import { Injectable } from '@angular/core';
import { DataSource } from '../models/dataSource';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Category } from '../models/category';
@Injectable()
export class DataSourceService {

  constructor(private httpClient: HttpClient) { }
  
  private dataSourceSource = new Subject<DataSource[]>();
  
  dataSources$ = this.dataSourceSource.asObservable();

  private categorySource = new Subject<Category>();
  
  selectedCategory$ = this.categorySource.asObservable();

  /**
   * This observable is for show the default plots
   * on the main page
   */
  private selectedDataSourceForDisplay = new Subject<DataSource>();
  selectedDataSourceForDisplay$ = this.selectedDataSourceForDisplay.asObservable();

  private apiPrefix = environment.apiPrefix;

  dataSourceUrl= this.apiPrefix+'api/datasource';

  public addNewDataSource(dataSource: DataSource):Observable<DataSource[]> {
    const json = JSON.stringify(dataSource);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.dataSourceUrl, params, {headers: headers, observe: 'response'})
      .catch(this.errorHandler);
  }

  public getDataSourcesByCategory(category: Category): Observable<DataSource[]> {
    return this.httpClient.get<any>(this.dataSourceUrl+'/category/'+category.id);
  }

  public addDataSourceToArray(dataSource: DataSource[]) {
    this.dataSourceSource.next(dataSource);
  }

  public setCurrentCategory(category: Category) {
    this.categorySource.next(category);
  }

  public deleteDataSource(dataSource: DataSource) : Observable<DataSource[]> {
    return this.httpClient.delete<any>(this.dataSourceUrl+"/"+dataSource.apiKey,{});
  }

  public updateDataSource(dataSource: DataSource) : Observable<DataSource> {
    const json = JSON.stringify(dataSource);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<DataSource>(this.dataSourceUrl,params,{headers: headers});
  }

  public getAllNodeDataSources(): Observable<DataSource[]> {
    return this.httpClient.get<DataSource[]>(this.dataSourceUrl);
  }

  public selectDataSourceForDisplay(dataSource: DataSource): void {
    this.selectedDataSourceForDisplay.next(dataSource);
  }


  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error || 'Server Error');

  }


}
