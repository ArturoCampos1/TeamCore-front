import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Menu } from './components/menu/menu';
import { Landing } from './components/landing/landing';
import { InicioSesion } from './components/inicio-sesion/inicio-sesion';
import { Registro } from './components/registro/registro';

export const routes: Routes = [

  // 🌍 LANDING (solo "/")
  { 
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },

  // 🌍 LANDING explícita (opcional)
  {
    path: 'landing',
    component: LandingLayout,
    children: [
      { path: '', component: Landing },
      { path: 'inicio-sesion', component: InicioSesion },
      { path: 'registro', component: Registro }
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