import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TogglepopupService } from '../../services/togglepopup.service';
import { ServiceService } from '../../services/service.service'; 
import { DateserviceService } from '../../services/dateservice.service';
import { IconsComponent } from '../icons/icons.component';
@Component({
  selector: 'app-category',
  imports: [CommonModule,ReactiveFormsModule,IconsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  category:any;
  categorytypes:any[]=[];
  expenseForm!:FormGroup;
  month:number=1;
  year:number=2025;
  allExpenses:any[]=[];
   toggleEdit:boolean=false;
   EditExpenseForm!:FormGroup;
   totalexpenditure:number=0;
constructor(private categoryService:ServiceService,private router:Router,private fb:FormBuilder,private expenseService:ExpenseService, public togglepopup:TogglepopupService, private dateService:DateserviceService){
  const navigation=this.router.getCurrentNavigation();
  this.category=navigation?.extras.state?.['data'];
  this.EditExpenseForm=this.fb.group({
    "billNo":[" ",Validators.required],
    "date":[" ",Validators.required],
    "shop":[" ",Validators.required],
    "description":[" ",Validators.required],
    "amount":[" ",Validators.required]})
}
goBack(){
  this.router.navigate(['/']);
}
ngOnInit(): void {
this.dateService.currentMonth$.subscribe((month)=>{
  this.month=month;
})
this.dateService.currentYear$.subscribe((year)=>{
  this.year=year;
})
  this.fetchCategoryTypesByCategory(); 
  console.log('All category types are',this.categorytypes);
  this.expenseService.findExpenses(this.category.id,this.month,this.year).subscribe((data)=>{
      this.allExpenses=data;
       this.TotalAmountforCategory();
    console.log('the total expenses are',this.allExpenses);})
    this.expenseForm=this.fb.group({
      description:['',[Validators.required,Validators.maxLength(100)]],
      sent_to:['',Validators.required],
      amount:[null,[Validators.required,Validators.min(0.1)]],
      expense_date:[null,Validators.required],
      type_id:[null,Validators.required]
          })

  }
EditingExpenseId:any=null;
EditExpense(expense:any){
  this.EditingExpenseId=expense.id;
  console.log('id is',expense.id);
  this.toggleEdit=!this.toggleEdit;
this.EditExpenseForm.patchValue({
billNo:expense.bill_no,
    date:expense.expense_date,
    shop:expense.sent_to,
    description:expense.description,
    amount:expense.amount

});
}
SubmitChanges(){
  if(this.EditExpenseForm.valid){
    console.log('idid',this.EditingExpenseId);
  this.expenseService.modifyExpense( this.EditingExpenseId,this.EditExpenseForm.value).subscribe((data)=>{
console.log(data);

this.toggleEdit=!this.toggleEdit;
this.TotalAmountforCategory();
  }
)}
else{
  console.log('All values not entered');
}
}
DeleteExpense(expense:any){
  this.expenseService.deactivateExpense(expense.id).subscribe(()=>{
  this.fetchAllExpenses();
  })
  this.fetchAllExpenses();
}
fetchCategoryTypesByCategory():void{
  this.categoryService.findCategoryTypesByCategory(this.category.id).subscribe((data)=>{
this.categorytypes=data;

  })
}
fetchAllExpenses():void{
  this.expenseService.findExpenses(this.category.id,this.month,this.year).subscribe((data)=>{
    this.allExpenses=data;
    this.TotalAmountforCategory();
  })
}
TotalAmountforCategory(){
  this.totalexpenditure=0;
  for (let expense of  this.allExpenses){
    this.totalexpenditure+=expense.amount;
  }
  console.log('total expenditure is',this.totalexpenditure);
  return this.totalexpenditure;
}
togglePopup():void{
  this.togglepopup.togglepopUp();
}
postexpense():void{
  console.log(this.expenseForm.value);
  if(this.expenseForm.valid){
  this.expenseService.postExpense(this.expenseForm.value).subscribe({
    next:(response)=>{
    console.log('posted expenses are',response);
    this.fetchAllExpenses();
    this.togglePopup();},
  error:(err)=>{
    console.error(err);
  }
  })
    
    

  }
}
getMonthName(month:number):string{
const months=[
 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month-1];

}

}