import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  list(): Array<RaceModel> {
    return [{ name: 'Lyon' }, { name: 'London' }];
  }
}