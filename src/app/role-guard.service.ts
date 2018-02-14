import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import * as decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('id_token');
    // decode the token to get its payload
    if(token === null) {
      this.router.navigate(['login']);
      return false;
    }
    const tokenPayload = decode(token);
    
    if (
      
      !this.auth.isAuthenticated() ||
      // tokenPayload.role !== expectedRole
      !this.checkForRole(tokenPayload.authorities, expectedRole)
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  private checkForRole(authoritiesArray: any[], role: string ): boolean {
    let match = false;
    authoritiesArray.forEach(element => {
      if (element.authority === role) {
        match = true;
      }
    });
    return match;
  }
}

