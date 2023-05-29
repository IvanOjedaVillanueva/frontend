import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InteceptorPrincipalInterceptor } from './interceptors/inteceptor-principal.interceptor'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaDeInicioComponent } from './pagina-de-inicio/pagina-de-inicio.component';
import { PaginaDeLoginComponent } from './pagina-de-login/pagina-de-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PaginaDeRegistroComponent } from './pagina-de-registro/pagina-de-registro.component';
import { NavbarComponent } from './navegacion/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PaginaDeInicioComponent,
    PaginaDeLoginComponent,
    PaginaDeRegistroComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InteceptorPrincipalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
