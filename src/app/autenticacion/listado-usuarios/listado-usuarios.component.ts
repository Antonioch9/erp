import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios:any;
  constructor( private autenticacionService:AutenticacionService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios(){
    this.autenticacionService.getUsuarios().subscribe((res:any)=>{
      this.usuarios = res.usuarios
    },(error)=>{
      console.log(error)
    })
  }

}
