import { Component, inject, signal } from '@angular/core';
import { CardData } from '../api/contract';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PageHeader } from '../page-header/page-header';

@Component({
  selector: 'app-card-detail',
  imports: [PageHeader, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.css',
})
export class CardDetail {
  private readonly route = inject(ActivatedRoute);

  readonly card = signal(
    this.route.snapshot.data['card'] as CardData | null
  );
}
