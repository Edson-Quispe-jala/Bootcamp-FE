import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FavoriteCards } from './favorite-cards';

describe('FavoriteCards', () => {
    let component: FavoriteCards;
    let fixture: ComponentFixture<FavoriteCards>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FavoriteCards],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoriteCards);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
