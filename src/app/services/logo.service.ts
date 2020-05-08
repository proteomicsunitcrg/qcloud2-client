import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Logo } from '../models/logo';
@Injectable({
  providedIn: 'root'
})
export class LogoService {

  constructor(private httpClient: HttpClient) { }

  // The url prefix
  private apiPrefix = environment.apiPrefix;

  // The message URL
  logoUrl = this.apiPrefix + 'api/logo';

  /**
   * @summary Sends a POST petition to the server to save the logo
   * @author Marc Serret
   * @since 1.0.0
   * @param {Logo} logo object to send to the server
   * @returns An observable with the saved logo
   * @access public
   */
  public saveLogo(logo: Logo): Observable<Logo> {
    const json = JSON.stringify(logo);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Logo>(this.logoUrl + '/save', params, { headers: headers });
  }

  /**
   * @summary Sends a GET petition to get all logos
   * @author Marc Serret
   * @since 1.0.0
   * @returns All the logos
   * @access public
   */
  public getAllLogos(): Observable<Logo[]> {
    return this.httpClient.get<Logo[]>(this.logoUrl);
  }

  public enableDisable(logo: Logo): Observable<Logo> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.patch<Logo>(`${this.logoUrl}/enableDisable`, JSON.stringify(logo), { headers: headers });
  }

  public deleteLogo(logo: Logo): Observable<Logo> {
    return this.httpClient.delete<Logo>(`${this.logoUrl}/${logo.apiKey}`);
  }

  public getEnabledLogo(): Observable<Logo> {
    return this.httpClient.get<Logo>(`${this.logoUrl}/enabled`);
  }

  public getByApiKey(apiKey): Observable<Logo> {
    return this.httpClient.get<Logo>(`${this.logoUrl}/${apiKey}`);
  }

  public updateLogo(logo: Logo): Observable<Logo> {
    const json = JSON.stringify(logo);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<Logo>(this.logoUrl + '/update', params, { headers: headers });
  }

}
