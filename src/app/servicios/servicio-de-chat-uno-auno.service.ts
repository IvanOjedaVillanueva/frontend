import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const chat_url: string = environment.chat_url

@Injectable({
  providedIn: 'root'
})
export class ServicioDeChatUnoAUnoService extends Socket {

  constructor(private cookieService: CookieService) {
    super({
      url:`${chat_url}`,
      options:{
        query:{
          token:cookieService.get('token')
        }
      }
    });

   }

}
