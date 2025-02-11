import { Component, Input } from '@angular/core';
import { iconObject } from '../../iconObject';
@Component({
  selector: 'app-icons',
  imports: [],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.css'
})
export class IconsComponent {
 
 @Input() categorytypeid!:number
  Icons=iconObject;
getIcon():string{
  console.log(this.categorytypeid);
  return this.Icons[this.categorytypeid]||"fa-regular fa-circle";
}

}
