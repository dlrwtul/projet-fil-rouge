import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, RouterOutlet, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServ:AuthService,private router : Router,private activatedRoute : ActivatedRoute,private tokenServ : TokenService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    
    if (!this.authServ.isAuthentificated()) {
      this.router.navigate(["/securite/login"])
      return false
    }
    let decoded : any = jwt_decode(this.tokenServ.getToken())  
    if (decoded.roles.indexOf(route.data['role']) == -1) {
      this.router.navigate(["/securite/login"])
      return false
    } 
    return true;
  }
  
}
