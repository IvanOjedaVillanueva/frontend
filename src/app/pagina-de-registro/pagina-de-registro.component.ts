import { Component } from '@angular/core';
import { ServicioLoginService } from '../servicios/servicio-login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { datosInicio } from '../modelos/datosInicio';
import { datosRegistro } from '../modelos/datosRegistro';

@Component({
  selector: 'app-pagina-de-registro',
  templateUrl: './pagina-de-registro.component.html',
  styleUrls: ['./pagina-de-registro.component.css']
})
export class PaginaDeRegistroComponent {
  constructor(private servicioLogin: ServicioLoginService, private router: Router, private cookieService: CookieService) { 
    cookieService.delete("token");
  }
  private datos: datosRegistro = {
    nombre_de_usuario: "",
    contraseña: "",
    correo_electronico:""
  }
  registro(usuario: HTMLInputElement, contrasenia: HTMLInputElement, repeat: HTMLInputElement, correo: HTMLInputElement) {
    if(contrasenia = repeat){
      this.datos.nombre_de_usuario = usuario.value;
      this.datos.contraseña = contrasenia.value;
      this.datos.correo_electronico = correo.value;
    }else{

    }

    this.servicioLogin.registro(this.datos).subscribe(
      res => {
        if (res.msg == "Usuario creado") {
          console.log("Se ha creado el usuario");
          this.cookieService.set('token', res.token, 7)
          this.router.navigate(['/']);// IMPORTANTE CUANDO TENGA UNA PAGINA QUE YA TENGA USUARIO LGUEADO
        } else {
          console.log("SOMO UNO TRISTE");
        }
      },
      err => {
        console.log("SOMO UNO TRISTE");
      }
    )

  }

}
