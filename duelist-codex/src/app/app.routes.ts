import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cards } from './cards/cards';
import { CardDetail } from './card-detail/card-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cards', component: Cards },
  { path: 'card/:id', component: CardDetail },
];
