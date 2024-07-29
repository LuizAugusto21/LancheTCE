import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'cliente',
    loadComponent: () => import('./features/cliente/cliente.component').then(m => m.ClienteComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendedor',
    loadComponent: () => import('./features/vendedor/vendedor.component').then(m => m.VendedorComponent),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
