import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Troubleshooting } from '../models/troubleshooting';

@Injectable()
export class TroubleshootingService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private troubleshootingUrl = this.apiPrefix + 'api/troubleshooting/';

  public getAllTroubleshootingByType(type: string): Observable<Troubleshooting[]> {
    return this.httpClient.get<Troubleshooting[]>(this.troubleshootingUrl + type);
  }

  public addTroubleshooting(troubleshooting: Troubleshooting, type: string ): Observable<Troubleshooting> {
    const json = JSON.stringify(troubleshooting);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Troubleshooting>(this.troubleshootingUrl + type, json, { headers: headers });
  }
}
