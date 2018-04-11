import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
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
export class ListadoProvComponent implements OnInit {
  id: string;
  //declaramos una variable
  proveedores: any;
  constructor(private proveedoresService: ProveedoresService) { }
  mensaje: string = 'Error de conexion con el servidor';
  //la enlazaremos con estadoAlerta del HTML
  mostrarAlerta: boolean = false;
  ngOnInit() {
    this.cargarProveedores();

  }
  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }
  //creamos un metodo para que detecte cualquier actualizacion
  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe((resp: any) => {
      console.log(resp);
      this.proveedores = resp.proveedores;
      console.log(this.proveedores);
    }, error => {
      console.log(error);
    })
  }
  // este metodo lo pondremos para el boton acepatar modal
  obtenerId(id){
    this.id = id;
  }
  borrarProveedor() {
    this.proveedoresService.deleteProveedor(this.id).subscribe((resp: any) => {
      this.mensaje = "El proveedor ha sido eliminado correctamente";
      this.mostrarAlerta =true;
      
      this.cargarProveedores();
      setTimeout(()=>{
        this.mostrarAlerta = false;
      },2500)
      
    },(error:any)=>{
      this.mensaje = "Error de conexion con el servidor";
      this.mostrarAlerta = true;
      setTimeout(()=>{
        this.mostrarAlerta = false;
      },2500)
    });
  }
}
