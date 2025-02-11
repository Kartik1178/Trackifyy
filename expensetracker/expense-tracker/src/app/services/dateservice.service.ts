import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DateserviceService {
  private monthSource = new BehaviorSubject<number>(new Date().getMonth() + 1); 
  private yearSource = new BehaviorSubject<number>(new Date().getFullYear()); 

  currentMonth$ = this.monthSource.asObservable();
  currentYear$ = this.yearSource.asObservable();

  setMonth(month: number): void {
    this.monthSource.next(month);
  }

  setYear(year: number): void {
    this.yearSource.next(year);
  }


   }

