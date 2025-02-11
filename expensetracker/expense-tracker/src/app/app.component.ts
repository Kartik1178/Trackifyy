import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [HeaderComponent,RouterModule],
  template: `
    <app-header></app-header>
   <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'expense-tracker';
}
