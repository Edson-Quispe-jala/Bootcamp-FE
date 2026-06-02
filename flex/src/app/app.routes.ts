import { Routes } from '@angular/router';
import { Board } from './board/board';
import { Card } from './card/card';
import { App } from './app';

export const routes: Routes = [
    { path: '', component: App },
    { path: 'card', component: Card },
    { path: 'board', component: Board }
];
