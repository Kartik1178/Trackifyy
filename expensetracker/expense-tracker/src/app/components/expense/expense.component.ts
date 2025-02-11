import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TogglepopupService } from '../../services/togglepopup.service';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { IconsComponent } from '../icons/icons.component';
@Component({
  selector: 'app-expense',
  imports: [CommonModule,ReactiveFormsModule,IconsComponent],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit{
  categorytypes:any[]=[];
expenseForm!:FormGroup;
constructor(private router:Router,private fb:FormBuilder,private expenseService:ExpenseService,public togglepopup:TogglepopupService,private categoryService:ServiceService){}
navigateWithData(categoryResponse:any){
  this.router.navigate(['/category'],{state:{data:categoryResponse}})
}

ngOnInit(): void {
  this.fetchCategoryTypes();
    this.expenseForm=this.fb.group({
description:['',[Validators.required,Validators.maxLength(100)]],
sent_to:['',Validators.required],
amount:[null,[Validators.required,Validators.min(0.1)]],
expense_date:[null,Validators.required],
type_id:[null,Validators.required]
    })

console.log(this.expenseForm.value);
  }

  fetchCategoryTypes():void{
    this.categoryService.fetchCategoryTypes().subscribe((data)=>{
  this.categorytypes=data;
  console.log('categorytypes',this.categorytypes);
    }
  
    )
  }
postexpense():void{
  console.log(this.expenseForm.value);
  if(this.expenseForm.valid){
  this.expenseService.postExpense(this.expenseForm.value).subscribe((response)=>{
    console.log('posted expenses are',response);
const categoryType=this.expenseForm.get('type_id')?.value;
console.log(categoryType);
this.categoryService.findCategorybyCategoryType(categoryType).subscribe((data:any)=>{
  console.log(data);
const categoryId=data?.id;
this.categoryService.findCategoryById(categoryId).subscribe((categoryResponse)=>{
console.log(categoryResponse);
this.togglepopup.togglepopUp();
this.navigateWithData(categoryResponse);

})
})

  }

  )
}
else{
  this.expenseForm.markAllAsTouched();
  console.log('All details not entered');
}
}

togglePopup():void{
  this.togglepopup.togglepopUp();
}



}