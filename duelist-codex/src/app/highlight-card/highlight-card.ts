import {
  computed,
  Directive,
  input,
} from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  host: {
    '[class.high-attack]': 'isHighAttack()',
  },
  standalone: true
})
export class HighlightCard {
  readonly atk = input<number | undefined>(0, { alias: 'appHighlightCard' });

  readonly isHighAttack = computed(() => (this.atk() ?? 0) > 2000);
}
