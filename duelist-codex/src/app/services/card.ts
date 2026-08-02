import { Injectable, signal, resource, computed } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { API_YUGIOH_URL } from '../api/endpoints';
import { CardData } from '../api/contract';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  readonly searchTerm = signal('');
  readonly searchInput = signal('');
  readonly offset = signal(0);
  readonly limit = signal(12);

  constructor() {
    toObservable(this.searchInput).pipe(
      debounceTime(1000),
      takeUntilDestroyed()
    ).subscribe(term => {
      if (this.searchTerm() !== term) {
        this.searchTerm.set(term);
        this.offset.set(0);
      }
    });
  }

  private readonly cardsResource = resource({
    params: () => ({
      name: this.searchTerm(),
      offset: this.offset(),
      limit: this.limit(),
    }),
    loader: async ({ params }) => {
      const { name, offset, limit } = params;
      const url = `${API_YUGIOH_URL}?${name ? `fname=${name}` : ''}&num=${limit}&offset=${offset}`;
      const response = await fetch(url);
      const data = await response.json();
      return (data.data || []) as CardData[];
    }
  });

  readonly cardList = computed(() => this.cardsResource.value() ?? []);
  readonly isLoading = this.cardsResource.isLoading;

  allowPrevious() {
    return this.offset() > 0;
  }

  allowNext() {
    return this.cardList().length === 12;
  }

  async getCardsById({ id }: { id?: string }): Promise<CardData[]> {
    const url = `${API_YUGIOH_URL}?${id ? `id=${id}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.data) {
      return data.data
    }
    return []
  }

  async getCardsByName({ name }: { name?: string }): Promise<CardData[]> {
    const url = `${API_YUGIOH_URL}?${name ? `name=${name}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data
  }
}
