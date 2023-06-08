import { Component, Input } from '@angular/core';
import { ServicioDeChatUnoAUnoService } from 'src/app/servicios/servicio-de-chat-uno-auno.service';
import { canalPrivado } from '../modelos/canalPrivado';
import { usuario } from '../modelos/usuario';
import { CookieService } from 'ngx-cookie-service';
import { ServicioDeInicioService } from '../servicios/servicio-de-inicio.service';
import { PaginaDeInicioComponent } from '../pagina-de-inicio/pagina-de-inicio.component';
import { servidor } from '../modelos/servidor';

@Component({
  selector: 'app-chat-unoa-uno',
  templateUrl: './chat-unoa-uno.component.html',
  styleUrls: ['./chat-unoa-uno.component.css']
})
export class ChatUnoaUnoComponent {
  private socket: any;
  public usuConectado!: usuario;
  @Input() childMessage!: canalPrivado;
  @Input() childMessageServer!: servidor;
  @Input() alternar!: boolean;


  constructor(private servicioDeChatUnoAUnoService: ServicioDeChatUnoAUnoService, private cookieService: CookieService, private ServicioDeInicio: ServicioDeInicioService,private componenteInicio:PaginaDeInicioComponent) {
    this.getUsuarioConectado()
    this.configurarListener()
  }
  getCanalSeleccionado() {
    //TENGO QUE CREAR EL SERVICIO LO CREO MANANA
  }
  getUsuarioConectado() {
    if (this.cookieService.check('token')) {
      this.ServicioDeInicio.getUsuarioConectado().subscribe(
        res => { this.usuConectado = res },
        err => { console.log("emo morios") }
      );
    } else {

    }

  }
  mandarMensaje(mensaje:HTMLInputElement,canalActual:canalPrivado){
    this.getUsuarioConectado()

    this.servicioDeChatUnoAUnoService.emit("enviarMensaje",JSON.stringify({msg:mensaje.value,canal:canalActual,autor:this.cookieService.get('token')}));
    this.childMessage.mensajes.push({mensaje:mensaje.value,usuario_enviador:this.usuConectado})
    
  }
  mandarMensajeServer(mensaje:HTMLInputElement,serverActual:servidor){
    this.getUsuarioConectado()

    this.servicioDeChatUnoAUnoService.emit("enviarMensajeServer",JSON.stringify({msg:mensaje.value,server:serverActual,autor:this.cookieService.get('token')}));
    this.childMessageServer.mensajes.push({mensaje:mensaje.value,usuario_enviador:this.usuConectado})
    
  }
  configurarListener(){
    this.getUsuarioConectado()

    this.servicioDeChatUnoAUnoService.on('enviarMensaje', async (data: any) => {
      const dataJSON = JSON.parse(data);
      this.childMessage.mensajes.push({mensaje:dataJSON.msg,usuario_enviador:dataJSON.sender})
      this.componenteInicio.actualizarEstado();
    })
    this.servicioDeChatUnoAUnoService.on('enviarMensajeServer', async (data: any) => {
      const dataJSON = JSON.parse(data);
      this.childMessageServer.mensajes.push({mensaje:dataJSON.msg,usuario_enviador:dataJSON.sender})
      this.componenteInicio.actualizarEstado();
    })
  }
}
