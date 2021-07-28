import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserModel } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './environment';
import { JwtInterceptor } from './jwt.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents: BehaviorSubject<UserModel | null>;

  constructor(private http: HttpClient, private jwtInterceptor: JwtInterceptor) {
    this.userEvents = new BehaviorSubject<UserModel | null>(null);
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.baseUrl}/api/users`, {
      login,
      password,
      birthYear
    });
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${environment.baseUrl}/api/users/authentication`, credentials)
      .pipe(tap((u: UserModel) => this.storeLoggedInUser(u)));
  }

  storeLoggedInUser(user: UserModel) {
    this.userEvents.next(user);
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.jwtInterceptor.setJwtToken(user.token);
  }

  retrieveUser() {
    const rememberMe = window.localStorage.getItem('rememberMe');

    if (rememberMe) {
      const user: UserModel = JSON.parse(rememberMe);
      this.userEvents.next(user);
      this.jwtInterceptor.setJwtToken(user.token);
    }
  }

  logout() {
    this.userEvents.next(null);
    window.localStorage.removeItem('rememberMe');
    this.jwtInterceptor.removeJwtToken();
  }
}
