import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service'
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-crear-prov',
  templateUrl: './crear-prov.component.html',
  styleUrls: ['./crear-prov.component.css'],
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
export class CrearProvComponent implements OnInit {
  @ViewChild('cif') cifRef: ElementRef;

  proveedorForm: FormGroup;
  proveedor: any;
  provincias: string[] = [
    'Alava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
    'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
    'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ]
  mensaje: string = 'Error de conexion con el servidor';
  //la enlazaremos con estadoAlerta del HTML
  mostrarAlerta: boolean = false;
  enviando: boolean = false;
  constructor(private pf: FormBuilder, private proveedoresService: ProveedoresService, private router: Router) { }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: null,
      cif: null,
      domicilio: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null,
      contacto: null,
    });
  }
  //metodo para el estado de alerta
  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }
  crearProv() {
    this.mostrarAlerta = false;
    this.enviando = true;
    this.proveedor = this.guardarProv();
    this.proveedoresService.postProveedor(this.proveedor).subscribe((resp: any) => {
      //navegacion programatica cuando haya una respuesta positiva y se rellene el formulario nos llevara a la pagina de lsitado de proveedores
      this.router.navigate(['/listado-proveedores'])
      this.enviando = false;
    }, (error: any) => {
      //cuando pase a error mostramos el mensaje de alerta
      console.log(error);
      this.mostrarAlerta = true;
      this.enviando = false;
      if (error.error.errores.errors.cif.message) {
        this.mensaje = error.error.errores.errors.cif.message
        this.cifRef.nativeElement.focus();
      }
    })
  }
  guardarProv() {
    const guardarProv = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      domicilio: this.proveedorForm.get('domicilio').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value,
    }
    return guardarProv;
  }

}