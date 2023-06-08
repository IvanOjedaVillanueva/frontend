import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { respuestaLogin } from '../modelos/respuestaLogin';
import {environment} from "../../environments/environment";
import { datosInicio } from '../modelos/datosInicio';
import { canalPrivado } from '../modelos/canalPrivado';
import { usuario } from '../modelos/usuario';
import { servidor } from '../modelos/servidor';
import { respuestaCanalPrivado } from '../modelos/respuestaCanalPrivado';
import { respuestaEntrarServer } from '../modelos/respuestaEntrarServer';
@Injectable({
  providedIn: 'root'
})
export class ServicioDeInicioService {
  private api_url: string = environment.api_url;


  constructor(private http: HttpClient) {
    if (this.api_url.endsWith('/'))
      this.api_url = this.api_url.substring(0, this.api_url.length - 1)
  }
  comprobarUsuario(): Observable<respuestaLogin> {

    return this.http.get<respuestaLogin>(`${this.api_url}/usuario/yo/info`);
  }
  mostrarCanalesPrivados(): Observable<{canales:[canalPrivado]}> {

    return this.http.get<{canales:[canalPrivado]}>(`${this.api_url}/usuario/yo/canales`);
  }
  mostrarServidores(): Observable<servidor[]> {
    return this.http.get<servidor[]>(`${this.api_url}/usuario/yo/servidores`);
  }
  mostrarUsuarios(): Observable<usuario[]> {

    return this.http.get<usuario[]>(`${this.api_url}/usuario/`);
  }
  getUsuarioConectado(): Observable<usuario> {
    return this.http.get<usuario>(`${this.api_url}/usuario/yo/info`);
  }
  crearCanales(datos:respuestaCanalPrivado):Observable<{msg:string}>{
    return this.http.post<{msg:string}>(`${this.api_url}/usuario/canalPrivado`,datos);
  }
  crearServidor(datos:servidor):Observable<{msg:string}>{
    return this.http.post<{msg:string}>(`${this.api_url}/server/yo/crearServidor`,datos);
  }
  borrarServidor(uuid_server?:string):Observable<{msg:string}>{
    return this.http.delete<{msg:string}>(`${this.api_url}/server/yo/borrarServidor/${uuid_server}`);
  }
  borrarCanal(uuid_canal?:string):Observable<{msg:string}>{
    return this.http.delete<{msg:string}>(`${this.api_url}/usuario/yo/borrarCanal/${uuid_canal}`);
  }
  mostrarCanal(uuid_canal:string|undefined):Observable<canalPrivado>{
    return this.http.get<canalPrivado>(`${this.api_url}/usuario/yo/canal/${uuid_canal}`);
  }
  entrarServidor(datos:respuestaEntrarServer):Observable<{msg:string}>{
    return this.http.put<{msg:string}>(`${this.api_url}/usuario`,datos);
  }
  mostrarServidor(uuid_servidor:string|undefined):Observable<servidor>{
    return this.http.get<servidor>(`${this.api_url}/usuario/yo/servidor/${uuid_servidor}`); //HAY Q CREARLO

  }
}
