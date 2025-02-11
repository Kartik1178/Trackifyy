import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() category:any;

@Output() cardClick = new EventEmitter<any>();

onCardClick() {
  this.cardClick.emit(this.category);
}





}
