import { Routes } from '@angular/router';

import { LandingLayout } from './layouts/landing-layout/landing-layout';
import { MainLayout } from './layouts/main-layout/main-layout';

import { Landing } from './components/landing-group/landing/landing';
import { InicioSesion } from './components/landing-group/inicio-sesion/inicio-sesion';
import { Registro } from './components/landing-group/registro/registro';
import { RegistroStep2 } from './components/landing-group/registro-step2/registro-step2';
import { RegistroStep3 } from './components/landing-group/registro-step3/registro-step3';

import { Dashboard } from './components/dashboard/dashboard/dashboard';

import { AdminDashboard } from './components/dashboard/admin-dashboard/admin-dashboard';
import { GerenteDashboard } from './components/dashboard/gerente-dashboard/gerente-dashboard';
import { RrhhDashboard } from './components/dashboard/rrhh-dashboard/rrhh-dashboard';
import { UsuarioDashboard } from './components/dashboard/usuario-dashboard/usuario-dashboard';
import { InvitadoDashboard } from './components/dashboard/invitado-dashboard/invitado-dashboard';

import { authGuard } from './interceptors/auth-guard';
import { roleGuard } from './interceptors/roleGuard';

export const routes: Routes = [

  // 🌍 LANDING
  {
    path: 'landing',
    component: LandingLayout,
    children: [

      {
        path: '',
        component: Landing
      },

      {
        path: 'inicio-sesion',
        component: InicioSesion
      },

      {
        path: 'registro',
        component: Registro
      },

      {
        path: 'registroStep2',
        component: RegistroStep2
      },

      {
        path: 'registroStep3',
        component: RegistroStep3
      }

    ]
  },

  // 🧑‍💼 APP PRIVADA
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'dashboard/admin',
        component: AdminDashboard,
        canActivate: [roleGuard],
        data: {
          role: 'ADMIN'
        }
      },

      {
        path: 'dashboard/gerente',
        component: GerenteDashboard,
        canActivate: [roleGuard],
        data: {
          role: 'GERENTE'
        }
      },

      {
        path: 'dashboard/usuario',
        component: UsuarioDashboard,
        canActivate: [roleGuard],
        data: {
          role: 'USUARIO'
        }
      },

      {
        path: 'dashboard/invitado',
        component: InvitadoDashboard,
        canActivate: [roleGuard],
        data: {
          role: 'INVITADO'
        }
      },

      {
        path: 'dashboard/RRHH',
        component: RrhhDashboard,
        canActivate: [roleGuard],
        data: {
          role: 'RRHH'
        }
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'landing'
  }

];