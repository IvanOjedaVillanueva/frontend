import { Component, EventEmitter, Output } from '@angular/core';
import { estadosActividad } from '../modelos/estadosActividad';
import { ServicioDeInicioService } from '../servicios/servicio-de-inicio.service';
import { respuestaLogin } from '../modelos/respuestaLogin';
import { canalPrivado } from '../modelos/canalPrivado';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { usuario } from '../modelos/usuario';
import { servidor } from '../modelos/servidor';
import { respuestaCanalPrivado } from '../modelos/respuestaCanalPrivado';
import { respuestaEntrarServer } from '../modelos/respuestaEntrarServer';

@Component({
  selector: 'app-pagina-de-inicio',
  templateUrl: './pagina-de-inicio.component.html',
  styleUrls: ['./pagina-de-inicio.component.css']
})
export class PaginaDeInicioComponent {
  public estados: estadosActividad;
  public canales: [canalPrivado] | undefined;
  public usuarios: usuario[] | undefined;
  public servidores: servidor[] | undefined;
  public usuConectado!: usuario;
  public creandoServidor:boolean=false;
  public uniendoServidor:boolean=false;

  estadosActividad = estadosActividad;
  private respuestaLogin: respuestaLogin | null = null;
  public canalActual!: canalPrivado;
  @Output() messageEvent = new EventEmitter<string>();


  constructor(private ServicioDeInicio: ServicioDeInicioService, private cookieService: CookieService,private router:Router) {
    this.estados = estadosActividad.pensando;
    this.actualizarEstado();
  }
  sendMessage(uuid_canal?:string) {
    this.messageEvent.emit(uuid_canal);
  }
  actualizarEstado() {
    if(this.cookieService.check('token')){
      console.log(this.estados)

        this.estados = estadosActividad.activo;
        this.mostrarCanalesPrivados();
        this.mostrarUsuarios();
        this.mostrarServidores();
        this.getUsuarioConectado();
    }else{
      this.estados = estadosActividad.inactivo;
    }
  }
  getUsuarioConectado(){
    if(this.cookieService.check('token')){
      this.ServicioDeInicio.getUsuarioConectado().subscribe(
        res => { this.usuConectado = res},
        err => { this.estados = estadosActividad.inactivo }
      );
    }else{

    }
  }
  mostrarCanalesPrivados(){
    this.ServicioDeInicio.mostrarCanalesPrivados().subscribe(
      res => { this.canales = res.canales},
      err => { this.estados = estadosActividad.inactivo }
    );
  }
  mostrarServidores(){
    this.ServicioDeInicio.mostrarServidores().subscribe(
      res => { this.servidores = res},
      err => { this.estados = estadosActividad.inactivo }
    );
  }
  mostrarUsuarios(){
    this.ServicioDeInicio.mostrarUsuarios().subscribe(
      res => { this.usuarios = res},
      err => { this.estados = estadosActividad.inactivo }
    );
  }
  logOut() {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/login');
  }
  private datosCanal: respuestaCanalPrivado = {
    nombre_de_canal: "",
    uuid_usuario:""
  }
  crearCanal(usuario: string,uuid_usuario?:string) {
    this.datosCanal.nombre_de_canal = usuario;
    this.datosCanal.uuid_usuario = uuid_usuario;
    //TENGO Q PONER UN DIALOGO CON LA PREGUNTA DEL NOMBRE, MAS FACIL ASI
    this.ServicioDeInicio.crearCanales(this.datosCanal).subscribe(
      res => {
        if (res.msg == "Canal creado") {
          this.router.navigate(['/']);
          this.actualizarEstado();
        }else if(res.msg == "CANAL YA EXISTENTE"){
          alert("YA TIENE UN CHAT CON ESTE USUARIO")
          this.router.navigate(['/']);
          this.actualizarEstado();
        } else {
          console.log("SOMO UNO TRISTE DE CANAL");
        }
      },
      err => {
        console.log("SOMO UNO TRISTE DE CANAL");
      }
    )

  }
  private datosServer:servidor = {
    nombre_de_servidor: "",
    usuarios: [],
    admin: undefined,
  }
  crearServidor(nombre_server:HTMLInputElement,usuario_creador:usuario){
    this.datosServer.nombre_de_servidor = nombre_server.value;
    this.datosServer.admin = usuario_creador;
    this.datosServer.usuarios.push(usuario_creador);
    this.ServicioDeInicio.crearServidor(this.datosServer).subscribe(
      res => {
        if (res.msg == "Servidor creado") {
          this.router.navigate(['/']);// IMPORTANTE CUANDO TENGA UNA PAGINA QUE YA TENGA USUARIO LGUEADO
          this.creandoServidor = false;
          this.actualizarEstado();

        } else {
          console.log("SOMO UNO TRISTE DE servidor");
        }
      },
      err => {
        console.log("SOMO UNO TRISTE DE servidor");
      }
    )
  }
  borraServidor(usu_admin?:usuario,usu_borrador?:usuario,uuid?:string){
    if(usu_admin == usu_borrador?.uuid_usuario){
      this.ServicioDeInicio.borrarServidor(uuid).subscribe(
        res => {
          if (res.msg == "Se ha borrado el servidor") {
            alert("Se ha borrado el servidor");
            this.router.navigate(['/']);// IMPORTANTE CUANDO TENGA UNA PAGINA QUE YA TENGA USUARIO LGUEADO
            this.actualizarEstado();
          } else {
            console.log("SOMO UNO TRISTE DE servidor");
          }
        },
        err => {
          console.log("SOMO UNO TRISTE DE servidor");
        }
      )
    }else{
      alert("No se puede borrar porque no eres propietario")
    }
  }
  borraCanal(uuid_canal?:string,usu_borrador?:usuario){
      this.ServicioDeInicio.borrarCanal(uuid_canal).subscribe(
        res => {
          if (res.msg == "Se ha borrado el canal") {
            alert("Se ha borrado el canal");
            this.router.navigate(['/']);
            this.actualizarEstado();
          } else {
            console.log("SOMO UNO TRISTE DE canal");
          }
        },
        err => {
          console.log("SOMO UNO TRISTE DE canal");
        }
      )
    
    
    this.actualizarEstado();

  }
  mostrarCanal(uuid_canal?:string){

    this.ServicioDeInicio.mostrarCanal(uuid_canal).subscribe(
      res => {
        console.log(res.uuid_canalPrivado);
        if (res!=null) {
          this.canalActual = res;
          console.log(this.canalActual.uuid_canalPrivado);
          this.router.navigate(['/']);
          this.actualizarEstado();
        } else {
          console.log("HEMOS TENIDO PROBLEMA CON EL MOSTRADO DEL CANAL");
        }
      },
      err => {
        console.log("HEMOS TENIDO PROBLEMA CON EL MOSTRADO DEL CANAL");
      })
    }
    entrarServidor(nombre_de_servidor:HTMLInputElement,usuario_creador:usuario){
      //crearServidor(nombre_server:HTMLInputElement,usuario_creador:usuario)
        this.datosServer.usuarios.push(usuario_creador);
        //BUSCAR EL SERVIDOR
      const datos:respuestaEntrarServer = {
        nombre_de_server: nombre_de_servidor.value

      }
        this.ServicioDeInicio.entrarServidor(datos).subscribe(
          res => {
            if (res.msg == "Se entro en el servidor") {
              this.router.navigate(['/']);// IMPORTANTE CUANDO TENGA UNA PAGINA QUE YA TENGA USUARIO LGUEADO
              this.creandoServidor = false;
              this.actualizarEstado();
    
            } else {
              console.log("SOMO UNO TRISTE DE servidor");
            }
          },
          err => {
            console.log("SOMO UNO TRISTE DE servidor");
          }
        )
      
    }
    
}
