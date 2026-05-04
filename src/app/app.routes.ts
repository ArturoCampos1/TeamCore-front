import { Routes } from '@angular/router';
import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Landing } from './components/landing/landing';
import { InicioSesion } from './components/inicio-sesion/inicio-sesion';
import { Registro } from './components/registro/registro';
import { RegistroStep2 } from './components/registro-step2/registro-step2';
import { RegistroStep3 } from './components/registro-step3/registro-step3';
import { Dashboard } from './components/dashboard/dashboard';

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
      { path: 'registro', component: Registro },
      { path: 'registroStep2', component: RegistroStep2 },
      { path: 'registroStep3', component: RegistroStep3 }
    ]
  },

  // 🧑‍💼 APP (con navbar)
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      ]
  }

];