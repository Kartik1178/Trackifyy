import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TogglepopupService {
showPopup=signal<boolean>(false)  
  constructor() { }
  togglepopUp(){
    this.showPopup.set(!this.showPopup());
  }
  
}
