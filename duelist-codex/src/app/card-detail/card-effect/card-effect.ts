import { Component, inject } from '@angular/core';
import { CardDetail } from '../card-detail';

@Component({
  selector: 'app-card-effect',
  standalone: true,
  templateUrl: './card-effect.html',
  styleUrl: './card-effect.css',
})
export class CardEffect {
  parent = inject(CardDetail);
}
