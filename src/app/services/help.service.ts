import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private httpClient: HttpClient) { }

  // ENV URL
  private apiPrefix = environment.apiPrefix;

  // Help API URL
  helpUrl = this.apiPrefix + 'api/help/';

  /**
   * @summary Sends a POST petition to the server to download the help
   * @author Marc Serret
   * @since 1.0.0
   * @param string requested file
   * @returns An observable boolean with the request status
   * @access public
   */
  public downloadFile(filename: string): Observable<HttpResponse<string>> {
    filename = filename + '.pdf';
    const headers = new HttpHeaders().set('Accept', 'application/pdf');
    return this.httpClient.get(this.helpUrl + filename, { headers: headers, observe: 'response', responseType: 'text' });
  }


}
