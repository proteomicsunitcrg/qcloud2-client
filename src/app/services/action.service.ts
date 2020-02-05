import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Troubleshooting } from '../models/troubleshooting';
import { TroubleshootingType } from '../models/troubleshootingType';
import { ItemList } from '../models/itemList';
import { Action } from '../models/action';

@Injectable()
export class ActionService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private troubleshootingUrl = this.apiPrefix + 'api/troubleshooting/action';

  private itemList = new Subject<ItemList>();
  itemList$ = this.itemList.asObservable();

  public getAllActions(): Observable<Action[]> {
    return this.httpClient.get<Action[]>(this.troubleshootingUrl);
  }

  public addTroubleshooting(troubleshooting: Troubleshooting, type: string): Observable<Troubleshooting> {
    const json = JSON.stringify(troubleshooting);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Troubleshooting>(this.troubleshootingUrl + type, json, { headers: headers });
  }

  public sendItemsToList(type: TroubleshootingType, items: Troubleshooting[]): void {
    this.itemList.next({ type, items });
  }

  public enableDisable(apiKey: string): Observable<Troubleshooting> {
    return this.httpClient.patch<Troubleshooting>(`${this.troubleshootingUrl}enableDisable/${apiKey}`, apiKey);
  }

}
