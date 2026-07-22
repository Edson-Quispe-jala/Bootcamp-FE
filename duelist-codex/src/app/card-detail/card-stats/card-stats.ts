import { Component, inject } from '@angular/core';
import { CardDetail } from '../card-detail';

@Component({
    selector: 'app-card-stats',
    standalone: true,
    templateUrl: './card-stats.html',
    styleUrl: './card-stats.css',
})
export class CardStats {
    parent = inject(CardDetail);
}
