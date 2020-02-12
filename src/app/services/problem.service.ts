import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Troubleshooting } from '../models/troubleshooting';
import { TroubleshootingType } from '../models/troubleshootingType';
import { ItemList } from '../models/itemList';
import { Problem } from '../models/problem';

@Injectable()
export class ProblemService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private troubleshootingUrl = this.apiPrefix + 'api/troubleshooting/problem';

  private itemList = new Subject<ItemList>();
  itemList$ = this.itemList.asObservable();

  public getAllProblems(): Observable<Problem[]> {
    return this.httpClient.get<Problem[]>(this.troubleshootingUrl);
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

  public saveProblem(action: Problem): Observable<Problem> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Problem>(this.troubleshootingUrl, JSON.stringify(action), {headers: headers});

  }

  public updateProblem(action: Problem, apiKey: string): Observable<Problem> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.patch<Problem>(`${this.troubleshootingUrl}/${apiKey}`, JSON.stringify(action), {headers: headers});
  }

  public getProblemByApiKey(actionApiKey: string): Observable<Problem> {
    return this.httpClient.get<Problem>(`${this.troubleshootingUrl}/${actionApiKey}`);
  }

}
