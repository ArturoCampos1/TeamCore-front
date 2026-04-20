import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Menu } from './components/menu/menu';
import { Landing } from './components/landing/landing';

export const routes: Routes = [

  // 🌍 LANDING (solo "/")
  {
    path: '',
    component: LandingLayout,
    pathMatch: 'full'
  },

  // 🌍 LANDING explícita (opcional)
  {
    path: 'landing',
    component: LandingLayout,
    children: [
      { path: '', component: Landing }
    ]
  },

  // 🧑‍💼 APP (con navbar)
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'menu', component: Menu }
    ]
  }

];