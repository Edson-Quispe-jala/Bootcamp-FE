import { Component, inject, signal } from '@angular/core';
import { CardService } from '../services/card';
import { Card } from '../card/card';
import { PageHeader } from '../page-header/page-header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards',
  imports: [Card, PageHeader, RouterLink],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
  protected readonly cardService = inject(CardService);
  protected readonly searchTerm = this.cardService.searchTerm;
  protected readonly cardList = this.cardService.cardList;
  protected readonly isLoading = this.cardService.isLoading;
  
  setSearch(name: string) {
    this.searchTerm.set(name);
  }

  searchCard() {
    this.cardService.getCards({ name: this.searchTerm() });
  }

  previousPage() {
    if (this.cardService.allowPrevious()) {
      this.cardService.getCards({ name: this.searchTerm(), offset: this.cardService.offset() - 12 });
    }
  }

  nextPage() {
    if (this.cardService.allowNext()) {
      this.cardService.getCards({ name: this.searchTerm(), offset: this.cardService.offset() + 12 });
    }
  }
}
