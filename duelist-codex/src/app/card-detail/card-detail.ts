import { Component, inject, input, signal } from '@angular/core';
import { CardData } from '../api/contract';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../services/card';
import { PageHeader } from '../page-header/page-header';

@Component({
  selector: 'app-card-detail',
  imports: [PageHeader],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.css',
})
export class CardDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly cardService = inject(CardService);

  readonly card = signal<CardData | null>(null);
  readonly id = this.route.snapshot.paramMap.get('id') || '';

  ngOnInit() {
    this.cardService.getCardsById({ id: this.id }).then((data) => {
      this.card.set(data[0]);
    });
  }
}
