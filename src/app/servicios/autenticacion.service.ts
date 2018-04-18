import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class AutenticacionService {
  token: string;
  nombre:String;
  constructor(private http: HttpClient, private router:Router) { 
    this.cargarCredenciales();
  }
  getUsuarios() {
    let url = "http://localhost:3000/usuario"
    //es una peticion get como en post man cuando se llame desde cualqeuir componente me duvuelva este metodo
    return this.http.get(url)
      //map recibe constanteme los cambios generados
      .map((resp: any) => {
        //sacamos el consumo de la acplicacion
        // console.log(resp);
        return resp;
      })
  }
  postUsuario(usuario) {
    let url = "http://localhost:3000/usuario"
    return this.http.post(url, usuario).map((resp: any) => {
      return resp;
    })
  }
  login(usuario) {
    let url = "http://localhost:3000/login"
    return this.http.post(url, usuario).map((resp: any) => {
      this.guardarCredenciales(resp.token,resp.nombre);
      this.nombre = resp.nombre;
      return resp;
    })
  }
  cargarCredenciales() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre')
    } else {
      this.token = '';
      this.nombre = '';
    }
  }
  guardarCredenciales(token,nombre) {
    localStorage.setItem('token', token)
    localStorage.setItem('nombre', nombre)
    this.token = token;
    this.nombre = nombre;
  }
  isLogged() {
    return (this.token.length > 0) ? true : false;
  }
  //para borrar el token
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('nombre')
    this.token= '';
    this.nombre = '';

    this.router.navigate(['/'])
  }
}
