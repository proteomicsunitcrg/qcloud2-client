import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { System } from '../models/system';
import { DataSource } from '../models/dataSource';
import { GuideSet } from '../models/guideSet';
import { CV } from '../models/cv';

@Injectable()
export class SystemService {

  private apiPrefix = environment.apiPrefix;

  systemUrl = this.apiPrefix + 'api/system';

  constructor(private httpClient: HttpClient) { }

  /**
   * This observable is for reload the system list
   * when there is a new system or the user has updated
   * one
   */
  private reloadSystemList = new Subject<boolean>();
  reloadSystemList$ = this.reloadSystemList.asObservable();

  /**
   * This observable is used to pass an existing system
   * to the system builder in order to edit it
   */
  private selectedSystem = new Subject<System>();
  selectedSystem$ = this.selectedSystem.asObservable();

  public selectSystem(system: System): void {
    this.selectedSystem.next(system);
  }

  public reloadList(): void {
    this.reloadSystemList.next(true);
  }

  /**
   * Get all the systems of the current node
   */
  public getSystems(): Observable<System[]> {
    return this.httpClient.get<System[]>(this.systemUrl);
  }

  public saveSystem(system: System): Observable<System> {
    const json = JSON.stringify(system);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<System>(this.systemUrl, params, { headers: headers });
  }

  public saveSystemDataSources(system: System, dataSources: DataSource[]): Observable<any> {
    const json = JSON.stringify(dataSources);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<System>(this.systemUrl + '/datasources/' + system.apiKey, params, { headers: headers });
  }

  public saveGuideSet(system: System, guideSet: GuideSet): Observable<System> {
    guideSet.startDate = guideSet.startDate + ' 00:00';
    guideSet.endDate = guideSet.endDate + ' 23:59';
    const json = JSON.stringify(guideSet);
    const params = json;
    guideSet.startDate = guideSet.startDate.slice(0, -6);
    guideSet.endDate = guideSet.endDate.slice(0, -6);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<System>(this.systemUrl + '/guideset/' + system.apiKey, params, { headers: headers });
  }

  public getSystemByApikey(systemApikey: string): Observable<System> {
    return this.httpClient.get<System>(this.systemUrl + '/' + systemApikey);
  }

  public updateSystem(system: System): Observable<any> {
    const json = JSON.stringify(system);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.put<System>(this.systemUrl + '/' + system.apiKey, params, { headers: headers });
  }

  /**
   * Return the main cv of a system
   * @param system the system to look into
   */
  public getMainCV(system: System): CV {
    let cv: CV;
    system.dataSources.forEach(
      (ds) => {
        if (ds.cv.category.mainDataSource === true) {
          cv = ds.cv;
        }
      }
    );
    return cv;
  }

}
