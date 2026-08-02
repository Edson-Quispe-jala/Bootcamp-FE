import { Component, inject } from '@angular/core';
import { CardDetail } from '../card-detail';
import { AddDollarSignPipe } from '../../pipes/add-dollar-sign-pipe';

@Component({
  selector: 'app-card-price',
  standalone: true,
  templateUrl: './card-price.html',
  styleUrl: './card-price.css',
  imports: [AddDollarSignPipe]
})
export class CardPrice {
  parent = inject(CardDetail);

  getPrice(priceType: 'tcgplayer_price' | 'ebay_price' | 'cardmarket_price' | 'coolstuffinc_price') {
    return this.parent.card()!.card_prices[0][priceType];
  }
}
