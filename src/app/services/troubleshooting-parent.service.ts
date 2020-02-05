import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Troubleshooting } from '../models/troubleshooting';
import { TroubleshootingType } from '../models/troubleshootingType';
import { ItemList } from '../models/itemList';
import { TroubleShootingParent } from '../models/troubleShootingParent';

@Injectable()
export class TroubleshootingParentService {

  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;
  private troubleshootingUrl = this.apiPrefix + 'api/troubleshooting/parent';

  private itemList = new Subject<ItemList>();
  itemList$ = this.itemList.asObservable();

  public getAllParents(): Observable<TroubleShootingParent[]> {
    return this.httpClient.get<TroubleShootingParent[]>(this.troubleshootingUrl);
  }


}
