import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

/**
 * Authorization service
 * This service handles the login/logout process
 * It stores the JWToken in the local storage
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 * @date 01/31/2018
 */


@Injectable()
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService,
    private route: Router) { }

  private apiPrefix = environment.apiPrefix;

  public login(email: string, password: string) {
    return this.http.post<any>(this.apiPrefix + 'api/auth', { username: email, password: password }, { observe: 'response' });
  }


  public setSession(authResult) {
    const expiresAt = authResult.headers.get('tokenexpiration');
    localStorage.setItem('id_token', authResult.body.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.route.navigate(['/']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    if (token === null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(parseInt(expiresAt, 10));
  }

  public testCredentials() {
    return this.http.get<any>('/api/nodes');
  }

  public checkRole(role: string): boolean {
    const authorities = this.jwtHelper.decodeToken(localStorage.getItem('id_token'))['authorities'];
    let hasRole = false;
    authorities.forEach(element => {
      if (element.authority === role) {
        hasRole = true;
      }
    });
    return hasRole;
  }

  public getUsername(): string {
    const username = this.jwtHelper.decodeToken(localStorage.getItem('id_token'))['sub'];
    return username;
  }

  public checkIfAdmin(): boolean {
    const authorities = this.jwtHelper.decodeToken(localStorage.getItem('id_token'))['authorities'];
    let admin = false;
    authorities.forEach(element => {
      if (element.authority === 'ROLE_ADMIN') {
        admin = true;
      }
    });
    return admin;
  }
}
