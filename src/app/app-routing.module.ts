import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaDeInicioComponent } from './pagina-de-inicio/pagina-de-inicio.component';
import { PaginaDeLoginComponent } from './pagina-de-login/pagina-de-login.component';
import { PaginaDeRegistroComponent } from './pagina-de-registro/pagina-de-registro.component';
const routes: Routes = [
  {
    path: '',
    component: PaginaDeInicioComponent,
    pathMatch: 'full'
  },{
    path: 'login',
    component: PaginaDeLoginComponent,
    pathMatch: 'full'
  },{
    path: 'register',
    component: PaginaDeRegistroComponent,
    pathMatch: 'full'
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
