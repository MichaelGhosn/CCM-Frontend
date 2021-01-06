import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import {ITokenModel} from '../../Models/Authentication/ITokenModel';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!localStorage.getItem('_token') || jwt_decode<ITokenModel>(localStorage.getItem('_token')).RoleName === 'admin') {
        this.router.navigate(['login']);
        return false;
    }
    return true;
  }

}
