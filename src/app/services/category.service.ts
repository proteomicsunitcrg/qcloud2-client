import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
/**
 * Service for instrument categories
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Injectable()
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  categoryUrl = '/api/category';

  public addNewCategory(category: Category): Observable<Category> {
    const json = JSON.stringify(category);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.categoryUrl, params, {headers: headers, observe: 'response'})
      .catch(this.errorHandler);
  }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryUrl);
  }


  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error || 'Server Error');
  }

}
