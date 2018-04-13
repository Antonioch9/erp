import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule}from'@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { FacturasService } from './servicios/facturas.service';
import { ListadoFactComponent } from './facturas/listado-fact/listado-fact.component';
import { EditarFactComponent } from './facturas/editar-fact/editar-fact.component';
import { CreacionFactComponent } from './facturas/creacion-fact/creacion-fact.component';

const rutas:Routes = [
    //la primera ruta es la raiz
    //cuando la ruta sea inicial carga el componete inicio
    {path:'',component:InicioComponent},
    {path:'compras',component:ComprasComponent},
    {path:'listado-proveedores',component:ListadoProvComponent},
    {path:'listado-fact',component:ListadoFactComponent},
    {path:'crear-proveedores',component:CrearProvComponent},
    {path:'crear-fact',component:CreacionFactComponent},
    {path:'editar-proveedor/:id',component:EditarProvComponent},
    {path:'editar-fact/:id',component:EditarFactComponent},
    //error 404
    {path:'**',component:InicioComponent}
    
  ]
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFactComponent,
    EditarFactComponent,
    CreacionFactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [ProveedoresService, FacturasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
