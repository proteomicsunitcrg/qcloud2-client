import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { System } from '../models/system';
import { Subject } from 'rxjs/Subject';
import { DataSource } from '../models/dataSource';
import { GuideSet } from '../models/guideSet';

@Injectable()
export class SystemService {

  private apiPrefix = environment.apiPrefix;

  systemUrl= this.apiPrefix+'api/system';

  constructor(private httpClient: HttpClient) { }
  /**
   * This observable is used to pass an existing system
   * to the system builder in order to edit it
   */
  private selectedSystem = new Subject<System>();
  selectedSystem$ = this.selectedSystem.asObservable();

  public selectSystem(system: System): void {
    this.selectedSystem.next(system);
  }

  private addedSystem = new Subject<System>();
  addedSystem$ = this.addedSystem.asObservable();

  public passNewSystemToList(system: System): void {
    this.addedSystem.next(system);
  }

  public getSystems(): Observable<System[]> {
    return this.httpClient.get<System[]>(this.systemUrl);
  }

  public saveSystem(system: System): Observable<System> {
    const json = JSON.stringify(system);
    const params = json;    
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<System>(this.systemUrl,params, {headers: headers});
  }

  public saveSystemDataSources(system: System, dataSources: DataSource[]): Observable<any> {
    const json = JSON.stringify(dataSources);
    const params = json;    
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<System>(this.systemUrl+'/datasources/'+system.apiKey,params, {headers: headers});
  }

  public saveGuideSet(system: System, guideSet: GuideSet): Observable<DataSource> {
    const json = JSON.stringify(guideSet);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<DataSource>(this.systemUrl+'/guideset/'+system.apiKey,params,{headers: headers});
  }



}
