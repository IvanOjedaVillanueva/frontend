import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { datosInicio } from '../modelos/datosInicio';
import { Observable } from 'rxjs';
import { respuestaLogin } from '../modelos/respuestaLogin';
import {environment} from "../../environments/environment";
import { datosRegistro } from '../modelos/datosRegistro';
@Injectable({
  providedIn: 'root'
})
export class ServicioLoginService {
  private api_url: string = environment.api_url;


  constructor(private http: HttpClient) {
    if (this.api_url.endsWith('/'))
      this.api_url = this.api_url.substring(0, this.api_url.length - 1)
  }
  inicioSesion(datos: datosInicio): Observable<respuestaLogin> {

    return this.http.post<respuestaLogin>(`${this.api_url}/login`, datos);
  }
  registro(datos: datosRegistro): Observable<respuestaLogin> {

    return this.http.post<respuestaLogin>(`${this.api_url}/usuario`, datos);
  }
}
