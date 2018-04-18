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
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { LoginComponent } from './autenticacion/login/login.component';
import { CrearClientesComponent } from './clientes/crear-clientes/crear-clientes.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { EditarClientesComponent } from './clientes/editar-clientes/editar-clientes.component';
import { CrearPresupuestosComponent } from './presupuestos/crear-presupuestos/crear-presupuestos.component';
import { ListadoPresupuestosComponent } from './Presupuestos/listado-presupuestos/listado-presupuestos.component';
import { EditarPresupuestosComponent } from './Presupuestos/editar-presupuestos/editar-presupuestos.component';
import { VentasComponent } from './ventas/ventas.component';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';


const rutas:Routes = [
    //la primera ruta es la raiz
    //cuando la ruta sea inicial carga el componete inicio
    {path:'',component:InicioComponent},
    //ruta para la autenticacion
    {path:'registro',component:RegistroComponent},
    {path:'crear-clientes',component:CrearClientesComponent, canActivate:[AutenticacionGuard]},
    {path:'editar-clientes',component:EditarClientesComponent, canActivate:[AutenticacionGuard]},
    {path:'listado-clientes',component:ListadoClientesComponent, canActivate:[AutenticacionGuard]},
    {path:'crear-presupuestos',component:CrearPresupuestosComponent, canActivate:[AutenticacionGuard]},
    {path:'editar-presupuestos',component:EditarPresupuestosComponent, canActivate:[AutenticacionGuard]},
    {path:'listado-presupuestos',component:ListadoPresupuestosComponent, canActivate:[AutenticacionGuard]},
    {path:'inicio-sesion',component:LoginComponent},
    {path:'listado-usuarios',component:ListadoUsuariosComponent, canActivate:[AutenticacionGuard]},

    //esto lo ponemos para proteger la ruta, que no se pueda acceder si no esta loggeado
    {path:'compras',component:ComprasComponent, canActivate:[AutenticacionGuard]},
    {path:'ventas',component:VentasComponent, canActivate:[AutenticacionGuard]},
    {path:'listado-proveedores',component:ListadoProvComponent,canActivate:[AutenticacionGuard]},
    {path:'listado-fact',component:ListadoFactComponent, canActivate:[AutenticacionGuard]},
    {path:'crear-proveedores',component:CrearProvComponent, canActivate:[AutenticacionGuard]},
    {path:'crear-fact',component:CreacionFactComponent, canActivate:[AutenticacionGuard]},
    {path:'editar-proveedor/:id',component:EditarProvComponent, canActivate:[AutenticacionGuard]},
    {path:'editar-fact/:id',component:EditarFactComponent, canActivate:[AutenticacionGuard]},
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
    CreacionFactComponent,
    RegistroComponent,
    LoginComponent,
    CrearClientesComponent,
    ListadoClientesComponent,
    EditarClientesComponent,
    CrearPresupuestosComponent,
    ListadoPresupuestosComponent,
    EditarPresupuestosComponent,
    VentasComponent,
    ListadoUsuariosComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [ProveedoresService, FacturasService, AutenticacionService, AutenticacionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
