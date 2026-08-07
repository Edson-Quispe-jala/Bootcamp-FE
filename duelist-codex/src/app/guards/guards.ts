import { CanActivateFn } from "@angular/router";
import { inject } from '@angular/core';
import { Router, RedirectCommand, ResolveFn } from '@angular/router';
import { CardData } from '../api/contract';
import { CardService } from '../services/card';

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

export const canShowFavorites: CanActivateFn = (route) => {
    const cardService = inject(CardService);
    return cardService.favoriteCards().length > 0;
};