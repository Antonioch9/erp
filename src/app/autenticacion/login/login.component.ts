import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    //definido en el HTML
    trigger('alerta', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario: any;
  mensaje: string = 'Error de conexion con el servidor';
  //la enlazaremos con estadoAlerta del HTML
  mostrarAlerta: boolean = false;
  enviando: boolean = false;


  constructor(private fl: FormBuilder, private autenticacionService: AutenticacionService, private router:Router) { }

  ngOnInit() {
    this.loginForm = this.fl.group({
      //validacion para el email
      email: ['', Validators.email],
      password: ['',Validators.required]
    })
  }
  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }
  inicioSesion() {
    this.mostrarAlerta = false;
    this.enviando = true;
    this.usuario = this.guardarUsuario();

  }
  guardarUsuario() {
    const guardarUsuario = {
      email: this.loginForm.get('email').value.toLowerCase(),
      password: this.loginForm.get('password').value,
    }
    return guardarUsuario;
  }
}