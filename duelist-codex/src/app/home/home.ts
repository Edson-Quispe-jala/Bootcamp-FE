import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  cardName = signal<string>('');
  router = inject(Router);

  setCardName(name: string) {
    this.cardName.set(name);
  }

  searchCard() {
    this.router.navigate(['/cards', this.cardName()]);
  }
}
