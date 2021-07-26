import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://ponyracer.ninja-squad.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(`${baseUrl}/api/users`, {
      login,
      password,
      birthYear
    });
  }
}
