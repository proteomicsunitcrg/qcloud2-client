import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ItemList2 } from '../models/itemList2';
import { TroubleShootingParent } from '../models/troubleShootingParent';

@Injectable()
export class TroubleshootingParentService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private troubleshootingUrl = this.apiPrefix + 'api/troubleshooting/parent';

  private itemList = new Subject<ItemList2>();
  itemList$ = this.itemList.asObservable();

  public saveParent(parent: TroubleShootingParent): Observable<TroubleShootingParent> {
    const params = JSON.stringify(parent);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<TroubleShootingParent>(this.troubleshootingUrl, params, {headers: headers});
  }

  public getAllParents(): Observable<TroubleShootingParent[]> {
    return this.httpClient.get<TroubleShootingParent[]>(this.troubleshootingUrl);
  }

  public getAllParentsWithActions(): Observable<TroubleShootingParent[]> {
    return this.httpClient.get<TroubleShootingParent[]>(`${this.troubleshootingUrl}/getOnlyWithActions`);
  }

  public getAllParentsWithProblems(): Observable<TroubleShootingParent[]> {
    return this.httpClient.get<TroubleShootingParent[]>(`${this.troubleshootingUrl}/getOnlyWithProblems`);
  }

  public getParentByParentApiKey(apiKey: string): Observable<TroubleShootingParent> {
    return this.httpClient.get<TroubleShootingParent>(`${this.troubleshootingUrl}/getByApiKey/${apiKey}`);
  }

  public unlinkAction(actionApiKey: string, parentApiKey: string): Observable<TroubleShootingParent> {
    let params = new HttpParams();
    params = params.set('actionApiKey', actionApiKey);
    params = params.set('parentApiKey', parentApiKey);
    return this.httpClient.patch<TroubleShootingParent>(`${this.troubleshootingUrl}/unlinkAction`, params);
  }

  public unlinkProblem(actionApiKey: string, parentApiKey: string): Observable<TroubleShootingParent> {
    let params = new HttpParams();
    params = params.set('problemApiKey', actionApiKey);
    params = params.set('parentApiKey', parentApiKey);
    return this.httpClient.patch<TroubleShootingParent>(`${this.troubleshootingUrl}/unlinkProblem`, params);
  }

  public linkAnction(actionApiKey: string, parentApiKey: string): Observable<TroubleShootingParent> {
    let params = new HttpParams();
    params = params.set('actionApiKey', actionApiKey);
    params = params.set('parentApiKey', parentApiKey);
    return this.httpClient.patch<TroubleShootingParent>(`${this.troubleshootingUrl}/linkAction`, params);
  }

  public linkProblem(actionApiKey: string, parentApiKey: string): Observable<TroubleShootingParent> {
    let params = new HttpParams();
    params = params.set('problemApiKey', actionApiKey);
    params = params.set('parentApiKey', parentApiKey);
    return this.httpClient.patch<TroubleShootingParent>(`${this.troubleshootingUrl}/linkProblem`, params);
  }

  public sendItemsToList(type: string, items: any): void {
    this.itemList.next({ type, items });
  }

}
