import {Injectable} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../_models/User";
import jwt_decode from "jwt-decode";
import {Token} from "../_models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private oauthService: OAuthService) {
    this.currentUserSubject = new BehaviorSubject<User>((this.convertTokenToUser()));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login() {
    this.currentUserSubject.next(this.convertTokenToUser());
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  convertTokenToUser(): User {
    const user: User = new User();
    if (this.oauthService.getAccessToken()) {
      const token: Token = this.getDecodedAccessToken(this.oauthService.getAccessToken());
      user.name = token.name;
      user.roles = token.roles;
      return user;
    }
    // @ts-ignore
    return null;
  }


  getDecodedAccessToken(token: string): Token {
    try {
      return jwt_decode(token);
    } catch (Error) {
      // @ts-ignore
      return null;
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded = jwt_decode(token);

    // @ts-ignore
    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    // @ts-ignore
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token =this.oauthService.getAccessToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    // @ts-ignore
    return !(date.valueOf() > new Date().valueOf());
  }
}
