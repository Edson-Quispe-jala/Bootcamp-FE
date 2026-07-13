import { Component, input } from '@angular/core';
import { CardData } from '../api/contract';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  readonly card = input<CardData>();

  getLevelArray(level: number | undefined): number[] {
    return Array.from({ length: level ?? 0 });
  }
}
