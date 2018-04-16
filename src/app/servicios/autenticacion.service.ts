import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AutenticacionService {

  constructor(private http: HttpClient) { }

  postUsuario(usuario) {
    let url = "http://localhost:3000/usuario"
    return this.http.post(url, usuario).map((resp: any) => {
      return resp;
    })
  }
}
