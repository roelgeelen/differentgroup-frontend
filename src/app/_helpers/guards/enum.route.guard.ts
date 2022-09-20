import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {FormsEnum} from "../../_pages/verkoop/forms/dynamic-form/model/formsEnum";

@Injectable({
  providedIn: 'root'
})
export class EnumRouteGuard implements CanActivate {

  constructor(private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const segment1: string = next.paramMap.get('form')!;

    // @ts-ignore
    const segment1IsEnum = Object.keys(FormsEnum).find(key => FormsEnum[key] === segment1);

    if (!(segment1IsEnum) ) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
