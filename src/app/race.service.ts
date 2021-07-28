import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, {
      params: { status: 'PENDING' }
    });
  }
}
