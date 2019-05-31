import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string ="https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  
  private apiKey: string ="YOURAPIKEY";

  private userToken: string;

  // Crear nuevos usuarios
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY] 

  // Iniciar sesion
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY] 

  constructor( private _http: HttpClient ) { 
    this.leerToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this._http.post(
      `${ this.url }/verifyPassword?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
          this.guardarToken( resp['idToken'] );
          return resp;
      })
    );
  }

  nuevoUsuario( usuario: UsuarioModel ) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this._http.post(
      `${ this.url }/signupNewUser?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( resp => {
          this.guardarToken( resp['idToken'] );
          return resp;
      })
    );
  }

  private guardarToken( idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  private leerToken() {

    if (localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  isLoged(): boolean {

    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(expira);

    if (fechaExpiracion > new Date()) {
      return true;
    } else {
      return false;
    }


    return this.userToken.length > 2;
  }

}
