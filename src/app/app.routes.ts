import { Routes } from '@angular/router';
import { authGuard } from './interceptors/auth-guard';
import { roleGuard } from './interceptors/roleGuard';

export const routes: Routes = [

  {
    path: 'landing',
    loadComponent: () =>
      import('./layouts/landing-layout/landing-layout').then(c => c.LandingLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/landing-group/landing/landing').then(c => c.Landing)
      },
      {
        path: 'inicio-sesion',
        loadComponent: () =>
          import('./components/landing-group/inicio-sesion/inicio-sesion').then(c => c.InicioSesion)
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('./components/landing-group/registro/registro').then(c => c.Registro)
      },
      {
        path: 'registroStep2',
        loadComponent: () =>
          import('./components/landing-group/registro-step2/registro-step2').then(c => c.RegistroStep2)
      },
      {
        path: 'registroStep3',
        loadComponent: () =>
          import('./components/landing-group/registro-step3/registro-step3').then(c => c.RegistroStep3)
      }
    ]
  },

  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then(c => c.MainLayout),
    canActivate: [authGuard],
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard/dashboard').then(c => c.Dashboard)
      },

      {
        path: 'dashboard/admin',
        loadComponent: () =>
          import('./components/dashboard/admin-dashboard/admin-dashboard').then(c => c.AdminDashboard),
        canActivate: [roleGuard],
        data: { role: 'ADMIN' }
      },
      {
        path: 'dashboard/admin/empresa',
        loadComponent: () =>
          import('./components/dashboard/gestiones/gestion-empresa/gestion-empresa').then(c => c.GestionEmpresa),
        canActivate: [roleGuard],
        data: { role: 'ADMIN' }
      },

      {
        path: 'dashboard/gerente',
        loadComponent: () =>
          import('./components/dashboard/gerente-dashboard/gerente-dashboard').then(c => c.GerenteDashboard),
        canActivate: [roleGuard],
        data: { role: 'GERENTE' }
      },
      {
        path: 'dashboard/gerente/departamentos',
        loadComponent: () =>
          import('./components/dashboard/gestiones/gestion-departamentos/gestion-departamentos').then(c => c.GestionDepartamentos),
        canActivate: [roleGuard],
        data: { role: 'GERENTE' }
      },
      {
        path: 'dashboard/gerente/proyectos',
        loadComponent: () =>
          import('./components/dashboard/gestiones/gestion-proyectos/gestion-proyectos').then(c => c.GestionProyectos),
        canActivate: [roleGuard],
        data: { role: 'GERENTE' }
      },

      {
        path: 'dashboard/rrhh',
        loadComponent: () =>
          import('./components/dashboard/rrhh-dashboard/rrhh-dashboard').then(c => c.RrhhDashboard),
        canActivate: [roleGuard],
        data: { role: 'RRHH' }
      },
      {
        path: 'dashboard/rrhh/empleados',
        loadComponent: () =>
          import('./components/dashboard/gestiones/gestion-empleados/gestion-empleados').then(c => c.GestionEmpleados),
        canActivate: [roleGuard],
        data: { role: 'RRHH' }
      },
      {
        path: 'dashboard/rrhh/vacaciones',
        loadComponent: () =>
          import('./components/dashboard/gestiones/gestion-vacaciones/gestion-vacaciones').then(c => c.GestionVacaciones),
        canActivate: [roleGuard],
        data: { role: 'RRHH' }
      },

      {
        path: 'dashboard/usuario',
        loadComponent: () =>
          import('./components/dashboard/usuario-dashboard/usuario-dashboard').then(c => c.UsuarioDashboard),
        canActivate: [roleGuard],
        data: { role: 'USUARIO' }
      },
      {
        path: 'dashboard/usuario/tareas',
        loadComponent: () =>
          import('./components/dashboard/gestiones/gestion-tareas/gestion-tareas').then(c => c.GestionTareas),
        canActivate: [roleGuard],
        data: { role: 'USUARIO' }
      },

      {
        path: 'dashboard/invitado',
        loadComponent: () =>
          import('./components/dashboard/invitado-dashboard/invitado-dashboard').then(c => c.InvitadoDashboard),
        canActivate: [roleGuard],
        data: { role: 'INVITADO' }
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'landing'
  }

];