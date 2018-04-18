import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private autenticacionService:AutenticacionService) { }

  ngOnInit() {
  }
//nos devolvera true o false para saber si el cliente esta logeado o no!
  getLogged(){
     return this.autenticacionService.isLogged();
  }

}
