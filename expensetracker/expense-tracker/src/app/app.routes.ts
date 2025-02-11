import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoryComponent } from './components/category/category.component';
export const routes: Routes = [
{
    path:'',
    component:HomepageComponent
},{
path:'category',
component:CategoryComponent}
];
