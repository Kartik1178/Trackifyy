import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
http=inject(HttpClient);
 fetchCategories():Observable<any>{
  const url=`http://localhost:8080/categories/`;
  return this.http.get(url);
 }
 fetchCategoryTypes():Observable<any>{
  const url=`http://localhost:8080/categorytype`;
  return this.http.get(url);
 }
findCategorybyCategoryType(categoryType:number):Observable<any>{
  const url=`http://localhost:8080/categories/${categoryType}`;
  return this.http.get(url);
}
findCategoryById(id:any):Observable<any>{
  const url=`http://localhost:8080/categories/findbyid/${id}`;
  return this.http.get(url);
}
findCategoryTypesByCategory(id:any):Observable<any>{
  const url=`http://localhost:8080/categorytype/${id}`;
  return this.http.get(url);
}

}
