import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true
})
export class HighlightCard {
  readonly atk = input<number | undefined>(0, {
    alias: 'appHighlightCard'
  });
  #element = inject(ElementRef);
  #renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const atk = this.atk();

      if ((atk ?? 0) > 2000) {
        this.#renderer.addClass(this.#element.nativeElement, 'high-attack');
      } else {
        this.#renderer.removeClass(this.#element.nativeElement, 'high-attack');
      }
    });
  }
}
