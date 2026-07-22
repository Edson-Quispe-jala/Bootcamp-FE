import { Component, inject, signal } from '@angular/core';
import { CardService } from '../services/card';
import { Card } from '../card/card';
import { PageHeader } from '../page-header/page-header';
import { RouterLink } from '@angular/router';
import { HighlightCard } from '../highlight-card/highlight-card';

@Component({
  selector: 'app-cards',
  imports: [Card, PageHeader, RouterLink, HighlightCard],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
  protected readonly cardService = inject(CardService);
  protected readonly searchTerm = this.cardService.searchInput;
  protected readonly cardList = this.cardService.cardList;
  protected readonly isLoading = this.cardService.isLoading;

  setSearch(name: string) {
    this.searchTerm.set(name);
  }

  previousPage() {
    if (this.cardService.allowPrevious()) {
      this.cardService.offset.update(offset => offset - 12);
    }
  }

  nextPage() {
    if (this.cardService.allowNext()) {
      this.cardService.offset.update(offset => offset + 12);
    }
  }
}
