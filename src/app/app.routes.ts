import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
 
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {

      path: 'formulario',
      component: FormularioComponent,
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
