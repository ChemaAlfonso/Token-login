import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel;;
  recuerdame: boolean = false;

  constructor( private _auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recuerdame = true;
    }
  }

  login( form: NgForm ){
    
    if (form.invalid){ return; }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor!',
      type: 'info'
    });
    Swal.showLoading();
    
    this._auth.login( this.usuario )
        .subscribe( data => {
          console.log(data);
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
