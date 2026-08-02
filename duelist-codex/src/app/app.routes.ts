import { CanActivateFn, Router, Routes, RedirectCommand } from '@angular/router';
import { Home } from './home/home';
import { Cards } from './cards/cards';
import { CardDetail } from './card-detail/card-detail';
import { CardService } from './services/card';
import { ResolveFn } from '@angular/router';
import { CardData } from './api/contract';
import { inject } from '@angular/core';
import { NotFound } from './not-found/not-found';

export const cardResolver: ResolveFn<CardData | RedirectCommand | null> = async (route) => {
  const cardService = inject(CardService);

  const router = inject(Router);

  const id = route.paramMap.get('id')!;

  const cards = await cardService.getCardsById({ id });

  if (cards.length === 0) {
    return new RedirectCommand(router.parseUrl('/not-found'));
  }
  return cards[0];
};

export const canShowStatsFn: CanActivateFn = (route) => {
  const router = inject(Router);

  const card = route.parent?.data['card'];

  if (card?.atk !== undefined || card?.def !== undefined) {
    return true;
  }
  const id = route.parent!.paramMap.get('id');

  return router.createUrlTree(['/card', id, 'effect']);
};

export const searchCard: CanActivateFn = async (route) => {
  const cardService = inject(CardService);
  const name = route.paramMap.get('name')!;

  cardService.searchTerm.set(name);
  cardService.searchInput.set(name);
  cardService.offset.set(0);

  return true;
};

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
  { path: '**', component: NotFound },
];
