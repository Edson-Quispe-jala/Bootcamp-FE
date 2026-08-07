import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  router = inject(Router);

  goToFavoriteCards() {
    this.router.navigate(['/favorites']);
  }
}
