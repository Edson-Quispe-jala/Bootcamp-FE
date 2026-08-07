import { Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  readonly #location = inject(Location);
  readonly #router = inject(Router);
  readonly title = input.required<string>();
  readonly redirectRoute = input<string>();

  goBack(): void {
    if (this.redirectRoute()) {
      this.#router.navigateByUrl(this.redirectRoute()!);
    } else {
      this.#location.back();
    }
  }
}
