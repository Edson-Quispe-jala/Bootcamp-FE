import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardData } from '../api/contract';
import { PageHeader } from '../page-header/page-header';

@Component({
  selector: 'app-specific-card',
  imports: [PageHeader],
  templateUrl: './specific-card.html',
  styleUrl: './specific-card.css',
})
export class SpecificCard {
  private readonly route = inject(ActivatedRoute);

  readonly card = signal(
    this.route.snapshot.data['card'] as CardData | null
  );
}
