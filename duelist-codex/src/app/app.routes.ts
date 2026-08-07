import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Cards } from './cards/cards';
import { CardDetail } from './card-detail/card-detail';
import { cardResolver, canShowStatsFn, searchCard, canShowFavorites } from './guards/guards';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cards', component: Cards },
  {
    path: 'card/:id',
    component: CardDetail,
    resolve: {
      card: cardResolver
    },
    children: [
      { path: '', redirectTo: 'effect', pathMatch: 'full' },
      { path: 'effect', loadComponent: () => import('./card-detail/card-effect/card-effect').then(m => m.CardEffect) },
      { path: 'price', loadComponent: () => import('./card-detail/card-price/card-price').then(m => m.CardPrice) },
      {
        path: 'stats',
        loadComponent: () => import('./card-detail/card-stats/card-stats').then(m => m.CardStats),
        canActivate: [canShowStatsFn]
      }
    ]
  },
  {
    path: 'cards/:name',
    component: Cards,
    resolve: {
      card: searchCard
    }
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorite-cards/favorite-cards').then(m => m.FavoriteCards),
    canActivate: [canShowFavorites]
  },
  { path: '**', component: NotFound },
];
