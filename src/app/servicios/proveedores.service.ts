import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class ProveedoresService {
  //lamaremos a esta libreria para poder trabajar con los verbos.
  constructor(private http: HttpClient) { }
  //nos cremos un metodo para que con los verbos se pueda acceder y ejecutara el contenido
  getProveedores() {
    let url = "http://localhost:3000/proveedor"
    //es una peticion get como en post man cuando se llame desde cualqeuir componente me duvuelva este metodo
    return this.http.get(url)
      //map recibe constanteme los cambios generados
      .map((resp: any) => {
        //sacamos el consumo de la acplicacion
        // console.log(resp);
        return resp;
      })
  }
  //hacemos el servicio para el proveedor que cogemos para actualizar
  getProveedorId(id) {
    let url = "http://localhost:3000/proveedor/";
    return this.http.get(url + id)
      .map((resp: any) => {
        return resp;
      })
  }
  //hacemos el post para el envio de datos
  //este metodo tendra la url donde hay que  mandarlo es la misma que get
  //ahora es un post y en el mensjae le tenemos que mandar algo y eso es el cuerpo del mensaje
  postProveedor(proveedor) {
    let url = "http://localhost:3000/proveedor"
    return this.http.post(url, proveedor).map((resp: any) => {
      //sacamos el consumo de la acplicacion
      return resp;
    })
  }
  //nuestro metodo para acutalizar compoenntes
  putProveedor(id, proveedor) {
    let url = "http://localhost:3000/proveedor/";
    return this.http.put(url + id, proveedor).map((resp: any) => {
      return resp;
    })
  }
  //hacemos el delete para borrar el proveedor que queramos
  deleteProveedor(id){
    let url = "http://localhost:3000/proveedor/";
    return this.http.delete(url+id).map((resp:any)=>{ return resp;})
  }

}
