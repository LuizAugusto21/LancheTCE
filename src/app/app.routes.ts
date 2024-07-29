import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
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
  {
    path: 'vender',
    loadComponent: () => import('./src/Pages/vender/vender.component').then(m => m.VenderComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./src/Pages/home/home.component').then(m => m.HomeComponent),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
