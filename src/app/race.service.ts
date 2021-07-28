import { Injectable } from '@angular/core';
import { LiveRaceModel, RaceModel } from './models/race.model';
import { interval, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { map, take } from 'rxjs/operators';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient, private wsService: WsService) {}

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, {
      params: { status: 'PENDING' }
    });
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  get(id: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${id}`);
  }

  cancelBet(raceId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    // return interval(1000)
    //   .pipe(
    //     map(position => [
    //       {
    //         id: 1,
    //         name: 'Superb Runner',
    //         color: 'BLUE',
    //         position
    //       },
    //       {
    //         id: 2,
    //         name: 'Awesome Fridge',
    //         color: 'GREEN',
    //         position
    //       },
    //       {
    //         id: 3,
    //         name: 'Great Bottle',
    //         color: 'ORANGE',
    //         position
    //       },
    //       {
    //         id: 4,
    //         name: 'Little Flower',
    //         color: 'YELLOW',
    //         position
    //       },
    //       {
    //         id: 5,
    //         name: 'Nice Rock',
    //         color: 'PURPLE',
    //         position
    //       }
    //     ])
    //   )
    //   .pipe(take(101));

    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(map(obj => obj.ponies));
  }
}
