import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
http=inject(HttpClient);

postExpense(expenseData:any):Observable<any>{
  const url=`http://localhost:8080/expense`;
const headers=new HttpHeaders({'Content-Type':'application/json'});
return this.http.post<any>(url,expenseData,{headers});
}
getExpense():Observable<any>{
  const url=`http://localhost:8080/expense`;
return this.http.get(url);
}
findExpenses(categoryid:any,month:number,year:number):Observable<any>{
  const url=`http://localhost:8080/expense/findcategory/${categoryid}/${month}/${year}`; 
  return this.http.get(url);
}
deactivateExpense(id:any):Observable<any>{
  const url=`http://localhost:8080/expense/deactivate/${id}`;
  return this.http.patch(url,{}); 
}
modifyExpense(id:any,updatedExpense:any):Observable<any>{
  const url=`http://localhost:8080/expense/modifyExpense/${id}`;
return this.http.patch(url,updatedExpense);
}


}
