import { Component, input, inject } from '@angular/core';
import { CardData } from '../api/contract';
import { CardService } from '../services/card';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  readonly card = input<CardData>();
  readonly cardService = inject(CardService);

  getLevelArray(level: number | undefined): number[] {
    return Array.from({ length: level ?? 0 });
  }

  get isFavorite(): boolean {
    const cardData = this.card();
    return cardData ? this.cardService.isFavorite(cardData.id) : false;
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    const cardData = this.card();
    if (cardData) {
      this.cardService.toggleFavorite(cardData);
    }
  }

  get isFocused(): boolean {
    const cardData = this.card();
    return cardData ? this.cardService.isFocused(cardData.id) : false;
  }

  toggleFocus(event: Event) {
    event.stopPropagation();
    const cardData = this.card();
    if (cardData) {
      this.cardService.toggleFocusedCard(cardData);
    }
  }
}
