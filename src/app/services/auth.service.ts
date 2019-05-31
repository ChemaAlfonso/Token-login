import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/";
  
  private apiKey: string ="AIzaSyBRzZO3zDVjO5MJXzl_OnZUrgXiXUjebiA";

  // Crear nuevos usuarios
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY] 

  // Iniciar sesion
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY] 

  constructor( private _http: HttpClient ) { }

  logOut(){}

  login( usuario: UsuarioModel){}

  nuevoUsuario( usuario: UsuarioModel ){}

}
