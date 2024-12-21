import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent() { return import('./home/home.component').then(m => m.HomeComponent); }},
];
