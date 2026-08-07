import { Component, inject } from '@angular/core';
import { CardService } from '../services/card';
import { PageHeader } from '../page-header/page-header';
import { RouterLink } from '@angular/router';
import { HighlightCard } from '../highlight-card/highlight-card';

@Component({
  selector: 'app-favorite-cards',
  imports: [PageHeader, RouterLink, HighlightCard],
  templateUrl: './favorite-cards.html',
  styleUrl: './favorite-cards.css',
})
export class FavoriteCards {
  protected readonly cardService = inject(CardService);
  protected readonly favoriteCards = this.cardService.favoriteCards;
}
