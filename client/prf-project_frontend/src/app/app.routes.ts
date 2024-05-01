import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'main',
        loadComponent: () =>
            import('./shared/views/main/main.component').then((c) => c.MainComponent),
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./signup/signup.component').then((c) => c.SignupComponent),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then((c) => c.LoginComponent),
    },
    {
        path: 'services',
        loadComponent: () =>
            import('./features/services/components/service.component').then(
                (c) => c.ServiceComponent
            ),
        canActivate: [authGuard],
        data: { roles: ['admin'] },
    },
    {
        path: 'user-management',
        loadComponent: () =>
            import('./user-management/user-management.component').then(
                (c) => c.UserManagementComponent
            ),
        canActivate: [authGuard],
        data: { roles: ['admin'] },
    },
    {
        path: 'not-found',
        loadComponent: () =>
            import('./shared/views/not-found/not-found.component').then((c) => c.NotFoundComponent),
    },
    { path: '**', redirectTo: 'not-found' },
];
