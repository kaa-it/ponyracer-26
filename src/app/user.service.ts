import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserModel } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const baseUrl = 'https://ponyracer.ninja-squad.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents: Subject<UserModel>;

  constructor(private http: HttpClient) {
    this.userEvents = new Subject<UserModel>();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(`${baseUrl}/api/users`, {
      login,
      password,
      birthYear
    });
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${baseUrl}/api/users/authentication`, credentials)
      .pipe(tap((u: UserModel) => this.userEvents.next(u)));
  }
}
