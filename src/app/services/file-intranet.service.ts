import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Node } from '../models/node';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class FileIntranetService {

  constructor(private httpClient: HttpClient) { }

  // The url prefix
  private apiPrefix = environment.apiPrefix;

  // The intranet file URL
  fileURL = this.apiPrefix + 'api/intranet/file';

  /**
   * @summary Sends a GET petition to the server to get all files (count)
   * @author Marc Serret
   * @since 1.0.0
   * @returns a number with all the total files
   * @access public
   */
  public countTotalFiles(): Observable<number> {
    return this.httpClient.get<number>(this.fileURL + '/countAll');
  }

  public deleteFile(checksum: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.fileURL}/${checksum}`);
  }

  public getPage(pageToRequest: number, filter: any, exact: number = 0, numberOfElements: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('page', pageToRequest.toString()).set('size', numberOfElements.toString()); // Pagination params
    params = params.set('checksum', filter.checksum);
    params = params.set('name', filter.name);
    params = params.set('labsystemName', filter.labsystem);
    params = params.set('sampleTypeId', filter.sampleType);
    params = params.set('node', filter.node);
    params = params.set('email', filter.email);
    params = params.set('exact', exact.toString());
    return this.httpClient.get<any>(`${this.fileURL}/getPage`, { params: params });
  }

  public getNodeByDataSourceApiKey(apiKey: string): Observable<Node> {
    let params = new HttpParams().set('apiKey', apiKey);
    return this.httpClient.get<Node>(`${this.fileURL}/getNode`, {params: params});
  }

  public getFileData(checksum: string): Observable<any> {
    let params = new HttpParams().set('checksum', checksum);
    return this.httpClient.get<any>(`${this.fileURL}/data`, {params: params});
  }

  public getUsers(email: string): Observable<User[]> {
    let params = new HttpParams().set('email', email);
    return this.httpClient.get<User[]>(`${this.fileURL}/user`, {params: params});
  }
}
