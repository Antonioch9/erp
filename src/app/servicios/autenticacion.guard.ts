import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AutenticacionService } from './autenticacion.service';
// esto lo que hace es muy parecido a los pipes,con esto vinculamos 
@Injectable()
export class AutenticacionGuard implements CanActivate {

  constructor(private autenticacionService:AutenticacionService){}
  canActivate(){
    if(this.autenticacionService.isLogged()){
      return true

    }else{
      return false;
    }
  }
    
  
}
