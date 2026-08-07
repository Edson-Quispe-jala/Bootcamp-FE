import { Component, inject, signal } from '@angular/core';
import { CardService } from '../services/card';
import { Card } from '../card/card';
import { PageHeader } from '../page-header/page-header';
import { RouterLink } from '@angular/router';
import { HighlightCard } from '../highlight-card/highlight-card';
import { cardAttributes, cardTypes } from '../api/contract';

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
  protected readonly failedRequest = this.cardService.failedRequest;
  protected readonly showFilters = signal(false);
  protected readonly typeFilter = this.cardService.typeFilter;
  protected readonly attributeFilter = this.cardService.attributeFilter;
  protected readonly atkInput = this.cardService.atkInput;
  protected readonly defInput = this.cardService.defInput;
  protected readonly focusedCard = this.cardService.focusedCard;

  clearFocus() {
    this.cardService.clearFocusedCard();
  }

  readonly cardTypes = cardTypes;
  readonly cardAttributes = cardAttributes;

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  setSearch(name: string) {
    this.searchTerm.set(name);
  }

  setTypeFilter(type: string) {
    this.cardService.setTypeFilter(type);
  }

  setAttributeFilter(attr: string) {
    this.cardService.setAttributeFilter(attr);
  }

  setAtkInput(atk: string) {
    this.cardService.setAtkInput(atk);
  }

  setDefInput(def: string) {
    this.cardService.setDefInput(def);
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
