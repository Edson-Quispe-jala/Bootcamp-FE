import { Component, inject } from '@angular/core';
import { CardDetail } from '../card-detail';
import { CardEffectPipe } from '../../pipes/card-effect-pipe';

@Component({
  selector: 'app-card-effect',
  standalone: true,
  imports: [CardEffectPipe],
  templateUrl: './card-effect.html',
  styleUrl: './card-effect.css',
})
export class CardEffect {
  parent = inject(CardDetail);
}
