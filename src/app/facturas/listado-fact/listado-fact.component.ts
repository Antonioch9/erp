import { Component, OnInit } from '@angular/core';
import {FacturasService} from '../../servicios/facturas.service'
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-fact',
  templateUrl: './listado-fact.component.html',
  styleUrls: ['./listado-fact.component.css'],
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
export class ListadoFactComponent implements OnInit {

  id:String;
  mensaje: string = 'Error de conexion con el servidor';
  //nos declaramos una variable para importar los datos de la BD
  factura:any;
  mostrarAlerta: boolean = false;
  constructor( private facturasService:FacturasService ) { }
 
  ngOnInit() {
    this.cargarFacturas();
  }
  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  //nos creamos un metodo para poder meter los datos de la bd
  cargarFacturas(){
    this.facturasService.getFacturas().subscribe((resp:any)=>{
      console.log(resp);
      this.factura=resp.factura;
    },error => {console.log(error)})
  }
  obtenerId(id){
    this.id = id;
    console.log(this.id)
  }
  borrarFactura(){
    this.facturasService.deleteFra(this.id).subscribe((resp:any)=>{
      console.log(this.id)
      this.mensaje="La factura ha sido eliminada"
      this.mostrarAlerta = true;
      this.cargarFacturas();
      setTimeout(()=>{
        this.mostrarAlerta= false;
      },3000)
    },(error:any)=>{
      this.mensaje="Error de conexion con el servidor";
      this.mostrarAlerta= true;
      setTimeout(()=>{
        this.mostrarAlerta= false;
      },3000)
    })
  }
}
