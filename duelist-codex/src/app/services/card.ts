import { Injectable, signal } from '@angular/core';
import { API_YUGIOH_URL } from '../api/endpoints';
import { CardData } from '../api/contract';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  readonly cardList = signal<CardData[]>([]);
  readonly searchTerm = signal('');
  readonly isLoading = signal(false);
  readonly offset = signal(0);

  constructor() {
    this.getCards({ limit: 12, offset: 0 });
  }

  allowPrevious() {
    return this.offset() > 0;
  }

  allowNext() {
    return this.cardList().length === 12;
  }

  async getCards({ name, limit = 12, offset = 0 }: { name?: string; limit?: number; offset?: number }) {
    this.isLoading.set(true);
    this.offset.set(offset);
    const url = `${API_YUGIOH_URL}?${name ? `fname=${name}` : ''}&num=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.data) {
      this.cardList.set(data.data);
    } else {
      this.cardList.set([]);
    }
    this.isLoading.set(false);
  }

  async getCardsById({ id }: { id?: string }): Promise<CardData[]> {
    const url = `${API_YUGIOH_URL}?${id ? `id=${id}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data
  }
}
