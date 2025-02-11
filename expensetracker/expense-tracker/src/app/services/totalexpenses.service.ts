import { Injectable } from '@angular/core';
import { ExpenseService } from './expense.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
 export class TotalexpensesService {
  constructor(private expenseService: ExpenseService) {}

  getTotalExpenseByCategory(id: any,year:number,month:number): Observable<number> {
    return this.expenseService.findExpenses(id,month,year).pipe(
      map((expenses) =>
        expenses.reduce((total:any, expense:any) => total + expense.amount, 0)
      ),
      catchError((error) => {
        console.error('Error fetching expenses:', error);
        return of(0); 
      })
    );
  }
}
