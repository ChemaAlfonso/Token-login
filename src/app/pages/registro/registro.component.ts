import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recuerdame: boolean = false;


  constructor( private _auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
  
    this.usuario = new UsuarioModel();

    this.usuario.email = 'contacto@tempuscode.com';
  }

  onSubmit(form){

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor!',
      text: 'Do you want to continue',
      type: 'info'
    });
    Swal.showLoading();
    
    this._auth.nuevoUsuario( this.usuario )
        .subscribe( data => {
          Swal.close();

          if ( this.recuerdame ) {
            localStorage.setItem('email', this.usuario.email);
          }
          
          this.router.navigateByUrl('/home');
        }, (err) => {
          Swal.fire({
            allowOutsideClick: false,
            title: 'Ha ocurrido un error!',
            text: err.error.error.message,
            type: 'error'
          });
        });
  }


}
