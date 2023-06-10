import { Component } from '@angular/core';
import { ServicioLoginService } from '../servicios/servicio-login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { datosInicio } from '../modelos/datosInicio';

@Component({
  selector: 'app-pagina-de-login',
  templateUrl: './pagina-de-login.component.html',
  styleUrls: ['./pagina-de-login.component.css']
})
export class PaginaDeLoginComponent {

  constructor(private servicioLogin: ServicioLoginService, private router: Router, private cookieService: CookieService) { }
  private datos: datosInicio = {
    nombre_de_usuario: "",
    contraseña: ""
  }
  public validado:boolean = false;
  inicioSesion(usuario: HTMLInputElement, contrasenia: HTMLInputElement) {
    this.datos.nombre_de_usuario = usuario.value;
    this.datos.contraseña = contrasenia.value;

    this.servicioLogin.inicioSesion(this.datos).subscribe(
      res => {
        if (res.msg == "Se ha logueado el usuario") {
          console.log("Hemo funcionao");
          this.cookieService.set('token', res.token, 7)
          this.router.navigate(['/']);// IMPORTANTE CUANDO TENGA UNA PAGINA QUE YA TENGA USUARIO LGUEADO
          this.validado = true;
        } else {
          alert("Usuario o contraseña incorrectos")
          console.log("SOMO UNO TRISTE");
        }
      },
      err => {
        console.log("SOMO UNO TRISTE");
      }
    )

  }
  borrarCookie() {
    this.cookieService.delete('token');
  }

}
