import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from '../expense/expense.component';
import { TogglepopupService } from '../../services/togglepopup.service';
import { TotalexpensesService } from '../../services/totalexpenses.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DateserviceService } from '../../services/dateservice.service';

@Component({
  selector: 'app-homepage',
  imports: [CardComponent,CommonModule,ExpenseComponent,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
month:number=1;
year:number=2025;
categories:any[]=[];
categorytypes:any[]=[];
defaultMonth:string;
constructor(private dateService:DateserviceService,private categoryService:ServiceService, public togglepopup:TogglepopupService,private router:Router,private totalExpenses:TotalexpensesService){
const now=new Date();
const year=now.getFullYear();
const month=String(now.getMonth()+1).padStart(2, '0'); 
this.defaultMonth=`${year}-${month}`

}
checkChange(newval:string):void{
const [selectedYear,selectedMonth]=newval.split('-');
this.month=parseInt(selectedMonth,10);
this.year=parseInt(selectedYear,10);
this.dateService.setMonth(this.month);
this.dateService.setYear(this.year);

console.log(this.month);
console.log(this.year);
this.getCategories();
}


ngOnInit():void{
this.getCategories();
}


getCategories():void{
this.categoryService.fetchCategories().subscribe((data)=>{
this.categories=data.map((category:any)=>({
  ...category,
  design:this.getCategoryDesign(category.name),
  totalExpenses:0})
);
 this.categories.forEach((category)=>{
  this.totalExpenses.getTotalExpenseByCategory(category.id,this.year,this.month).subscribe((total)=>{
    category.totalExpenses=total;
  })
})

console.log('All categories',this.categories);
})
} 


 getCategoryDesign(title:string):{color:string; icons:string[]; desc:string[]}
{
switch(title){
case 'Groceries':
return{
  color:'rgb(64, 208, 83)',
  icons:["fa-solid fa-apple-whole","fa-solid fa-cheese","fa-solid fa-pepper-hot"],
  desc:['Milk,','Meat,','Fruits and Vegetables etc'],

};
case 'Transportation':
return{
  color:'rgb(204, 132, 16)',
  icons:["fa-solid fa-gas-pump","fa-solid fa-train","fa-solid fa-bus"],
  desc:['Fuel,','Bus,','Train etc'],

};
case 'Food':
  return{
    color:'rgb(241, 76, 76)',
  icons:["fa-solid fa-bowl-food","fa-solid fa-burger","fa-solid fa-fish"],
  desc:['Dine out,','Swiggy,','Zomato etc'],
  }; 
  case 'Fun':
  return{
    color:'rgb(255, 0, 81)',
  icons:["fa-solid fa-location-dot","fa-solid fa-tent","fa-solid fa-film"],
  desc:['Leisure and other Fun activities'],
  }; 
  case 'Healthcare':
  return{
    color:'#008b8b',
  icons:["fa-solid fa-syringe","fa-solid fa-stethoscope"],
  desc:['Medical Insurances,','Doctor Visits etc'],
  }; 
  case 'Utilities':
  return{
    color:'rgb(4, 4, 149)',
  icons:["fa-solid fa-wifi","fa-regular fa-lightbulb"],
  desc:['Internet,','Electricity,','Water,','Gas etc'],
  }; 
  case 'Misc':
  return{
    color:'rgb(94, 47, 12)',
  icons:["fa-solid fa-wallet","fa-regular fa-credit-card"],
  desc:['Any other ','spending you might have'],
  }; 
  default:
    return{
      color:'',
      icons:[""],
      desc:['default'],
    }

}


}
togglePopup():void{
  this.togglepopup.togglepopUp();
}
categoryResponse:any='';
onCardClick(category:any){
  console.log('category is',category.id);
this.categoryService.findCategoryById(category.id).subscribe((data)=>{
  this.categoryResponse=data;
  this.router.navigate(['/category'], { state: { data: this.categoryResponse } });
})

}
}
