import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { ListadoFraComponent } from './facturas/listado-fra/listado-fra.component';
import { CrearFraComponent } from './facturas/crear-fra/crear-fra.component';
import { EditarFraComponent } from './facturas/editar-fra/editar-fra.component';
import { FacturasService } from './servicios/facturas.service';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { LoginComponent } from './autenticacion/login/login.component';
import { VentasComponent } from './ventas/ventas.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClientesComponent } from './clientes/crear-clientes/crear-clientes.component';
import { EditarClientesComponent } from './clientes/editar-clientes/editar-clientes.component';
import { ClientesService } from './servicios/clientes.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { ListadoPresComponent } from './presupuestos/listado-pres/listado-pres.component';
import { CrearPresComponent } from './presupuestos/crear-pres/crear-pres.component';
import { EditarPresComponent } from './presupuestos/editar-pres/editar-pres.component';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';
import { ListadoSesionesComponent } from './autenticacion/listado-sesiones/listado-sesiones.component';

const rutas:Routes = [
  {path:'' , component: InicioComponent},
  {path:'registro', component: RegistroComponent},
  {path:'inicio-sesion', component: LoginComponent},
  {path:'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [AutenticacionGuard]},
  {path:'listado-sesiones/:nombre', component: ListadoSesionesComponent, canActivate: [AutenticacionGuard]},
  {path:'compras', component: ComprasComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-proveedores', component: ListadoProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-proveedor', component: CrearProvComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-proveedor/:id', component: EditarProvComponent, canActivate: [AutenticacionGuard]},
  {path:'ventas', component: VentasComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-clientes', component: ListadoClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-cliente', component: CrearClientesComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-cliente/:id', component: EditarClientesComponent, canActivate: [AutenticacionGuard]},  
  {path: 'listado-facturas', component: ListadoFraComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-factura', component: CrearFraComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-factura/:id', component: EditarFraComponent, canActivate: [AutenticacionGuard]},
  {path: 'listado-presupuestos', component: ListadoPresComponent, canActivate: [AutenticacionGuard]},
  {path: 'crear-presupuesto', component: CrearPresComponent, canActivate: [AutenticacionGuard]},
  {path: 'editar-presupuesto/:id', component: EditarPresComponent, canActivate: [AutenticacionGuard]},
  {path: '**', component: InicioComponent}
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
    ListadoFraComponent,
    CrearFraComponent,
    EditarFraComponent,
    RegistroComponent,
    LoginComponent,
    VentasComponent,
    ListadoClientesComponent,
    CrearClientesComponent,
    EditarClientesComponent,
    ListadoPresComponent,
    CrearPresComponent,
    EditarPresComponent,
    ListadoUsuariosComponent,
    ListadoSesionesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProveedoresService, 
              FacturasService, 
              AutenticacionService, 
              ClientesService,
              PresupuestosService,
              AutenticacionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
