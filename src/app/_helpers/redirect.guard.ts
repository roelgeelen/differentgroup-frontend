import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const path = route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
    window.open('https://wonderful-ground-054d07e03.4.azurestaticapps.net/'+path, '_blank');
    return false;
  }

}
