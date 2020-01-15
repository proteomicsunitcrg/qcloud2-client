import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MapsService {
  constructor(private httpClient: HttpClient) { }

  // ENV URL
  private apiPrefix = environment.apiPrefix;

  // Email API URL
  nomatimUrl =  'https://nominatim.openstreetmap.org/search?q=';

  public getPlaceByCityAndCountry(city: string, country: string): Observable<any> {
    return this.httpClient.get(`${this.nomatimUrl}${city},${country}&format=json`);
  }
  public getPlaceByCountry(country: string): Observable<any> {    
    return this.httpClient.get(`${this.nomatimUrl}${country}&format=json`);
  }

}
