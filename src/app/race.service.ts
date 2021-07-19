import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  list(): Observable<Array<RaceModel>> {
    return of([{ name: 'Lyon' }, { name: 'Los Angeles' }, { name: 'Sydney' }, { name: 'Tokyo' }, { name: 'Casablanca' }]).pipe(delay(500));
  }
}
