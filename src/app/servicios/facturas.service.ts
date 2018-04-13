import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class FacturasService {

  constructor(private http: HttpClient) { }
//nos creamos el metodo get para obtenr los daots de la BD
getFacturas(){
  let url="http://localhost:3000/factura"
  return this.http.get(url).map((resp:any)=>{
    return resp;
  })
}
getFacturasId(id) {
  let url = "http://localhost:3000/factura/";
  return this.http.get(url + id)
    .map((resp: any) => {
      return resp;
    })
}
postFra(facturas) {
  let url = "http://localhost:3000/factura"
  return this.http.post(url, facturas).map((resp: any) => {
    //sacamos el consumo de la aplicacion
    return resp;
  })
}
putFra(id, factura) {
  let url = "http://localhost:3000/factura/";
  return this.http.put(url + id, factura).map((resp: any) => {
    return resp;
  })
}
deleteFra(id){
  let url = "http://localhost:3000/factura/";
  return this.http.delete(url+id).map((resp:any)=>{ return resp;})
}
}
