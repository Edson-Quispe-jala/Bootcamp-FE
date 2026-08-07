import { Injectable, signal, resource, computed, Signal } from '@angular/core';
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
  readonly typeFilter = signal('');
  readonly attributeFilter = signal('');
  readonly atkInput = signal<number | null>(null);
  readonly atkFilter = signal<number | null>(null);
  readonly defInput = signal<number | null>(null);
  readonly defFilter = signal<number | null>(null);
  readonly offset = signal(0);
  readonly limit = signal(12);

  constructor() {
    this.setupDebouncedSignal(this.searchInput, this.searchTerm);
    this.setupDebouncedSignal(this.atkInput, this.atkFilter);
    this.setupDebouncedSignal(this.defInput, this.defFilter);
  }

  private setupDebouncedSignal<T>(
    source: Signal<T>,
    target: { (): T; set(value: T): void },
    delay = 1000
  ) {
    toObservable(source).pipe(
      debounceTime(delay),
      takeUntilDestroyed()
    ).subscribe(val => {
      if (target() !== val) {
        target.set(val);
        this.offset.set(0);
      }
    });
  }

  setTypeFilter(type: string) {
    this.typeFilter.set(type);
    this.offset.set(0);
  }

  setAttributeFilter(attr: string) {
    this.attributeFilter.set(attr);
    this.offset.set(0);
  }

  setAtkInput(value: string | number | null) {
    const num = value === '' || value === null || value === undefined ? null : Number(value);
    this.atkInput.set(num);
  }

  setDefInput(value: string | number | null) {
    const num = value === '' || value === null || value === undefined ? null : Number(value);
    this.defInput.set(num);
  }

  private readonly cardsResource = resource({
    params: () => ({
      name: this.searchTerm(),
      offset: this.offset(),
      limit: this.limit(),
      type: this.typeFilter(),
      attribute: this.attributeFilter(),
      atk: this.atkFilter(),
      def: this.defFilter(),
    }),
    loader: async ({ params }) => {
      const { name, offset, limit, type, attribute, atk, def } = params;
      let url = `${API_YUGIOH_URL}?${name ? `fname=${name}` : ''}&num=${limit}&offset=${offset}`;
      if (type) url += `&type=${encodeURIComponent(type)}`;
      if (attribute) url += `&attribute=${encodeURIComponent(attribute)}`;
      if (atk !== null && atk !== undefined) url += `&atk=${atk}`;
      if (def !== null && def !== undefined) url += `&def=${def}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      return (data.data || []) as CardData[];
    }
  });

  readonly cardList = computed(() => this.cardsResource.value() ?? []);
  readonly isLoading = this.cardsResource.isLoading;
  readonly failedRequest = this.cardsResource.error;

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

  private getFavoritesFromStorage(): CardData[] {
    const stored = localStorage.getItem('favorite_cards');
    return stored ? JSON.parse(stored) : [];
  }

  private saveFavoritesToStorage(favorites: CardData[]) {
    localStorage.setItem('favorite_cards', JSON.stringify(favorites));
    this.favoriteCards.set(favorites);
  }

  readonly favoriteCards = signal<CardData[]>(this.getFavoritesFromStorage());
  readonly focusedCard = signal<CardData | null>(null);

  isFavorite(cardId: string): boolean {
    return this.favoriteCards().some(c => c.id === cardId);
  }

  toggleFavorite(card: CardData) {
    const currentFavorites = this.favoriteCards();
    const isFav = currentFavorites.some(c => c.id === card.id);

    if (isFav) {
      this.saveFavoritesToStorage(currentFavorites.filter(c => c.id !== card.id));
    } else {
      this.saveFavoritesToStorage([...currentFavorites, card]);
    }
  }

  isFocused(cardId: string): boolean {
    return this.focusedCard()?.id === cardId;
  }

  toggleFocusedCard(card: CardData) {
    if (this.focusedCard()?.id === card.id) {
      this.focusedCard.set(null);
    } else {
      this.focusedCard.set(card);
    }
  }

  clearFocusedCard() {
    this.focusedCard.set(null);
  }
}
