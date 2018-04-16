import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
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
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  constructor(private fr: FormBuilder, private autenticacionService: AutenticacionService, private router:Router) { }
  usuario: any;
  mensaje: string = 'Error de conexion con el servidor';
  //la enlazaremos con estadoAlerta del HTML
  mostrarAlerta: boolean = false;
  enviando: boolean = false;
  ngOnInit() {
    this.registroForm = this.fr.group({
      nombre: ['', Validators.required],
      //validacion para el email
      email: ['', Validators.email],
      //utilizaremos un patron de contraseña lo descargamos de html5 pattern
      password: ['', [Validators.required,
        // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]
      ]],
      confirma: ''
    })
  }
  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }
  registroUsuario() {
    this.mostrarAlerta = false;
    this.enviando = true;
    this.usuario = this.guardarUsuario();
    this.autenticacionService.postUsuario(this.usuario).subscribe((res: any) => { 
      this.router.navigate(['/']);
      this.enviando = false;
     },(error:any)=>{
      this.mostrarAlerta = true;
      this.enviando = false;
      if (error.error.errores.errors.email.message) {
        this.mensaje = error.error.errores.errors.email.message
        
      }
     })

  }
  guardarUsuario() {
    const guardarUsuario = {
      nombre: this.registroForm.get('nombre').value,
      email: this.registroForm.get('email').value.toLowerCase(),
      password: this.registroForm.get('password').value,
    }
    return guardarUsuario;
  }
}
