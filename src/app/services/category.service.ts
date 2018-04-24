import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
/**
 * Service for instrument categories
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Injectable()
export class CategoryService {
  
  constructor(private httpClient: HttpClient) { }

  private apiPrefix = environment.apiPrefix;

  private categorySource = new Subject<Category>();
  selectedCategory$ = this.categorySource.asObservable();

  // Observable for cv list
  

  // Observable for instrument list


  categoryUrl = this.apiPrefix+'api/category';

  public selectCategory(category: Category): void {
    this.categorySource.next(category);
  }

  public addNewCategory(category: Category): Observable<Category> {
    const json = JSON.stringify(category);
    const params = json;
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(this.categoryUrl, params, {headers: headers, observe: 'response'})
      .catch(this.errorHandler);
  }

  public setCurrentCategory(category: Observable<Category>) {
    category.subscribe(
      (category) => {
        this.categorySource.next(category);
      }
    )
  }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryUrl);
  }

  /**
   * Find the category object into the database
   * @param categoryName the name of the category
   */
  public getCategoryByName(categoryName: string): Observable<Category> {
    return this.httpClient.get<Category>(this.categoryUrl+'/'+categoryName);
  }

  public categoryToMainCategory(category: Category): Observable<any> {
    return this.httpClient.put(this.categoryUrl+'/makemain/'+category.id,{});
  }

  public getMainCategory(): Observable<Category> {
    return this.httpClient.get<Category>(this.categoryUrl+'/main');
  }




  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error || 'Server Error');
  }

}
