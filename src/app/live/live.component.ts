import { Component, OnDestroy, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> | null = null;
  positionSubscription: Subscription | null = null;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const raceId = this.route.snapshot.paramMap.get('raceId');
    const id = Number(raceId);
    if (!isNaN(id)) {
      this.raceService.get(id).subscribe(race => (this.raceModel = race));
      this.positionSubscription = this.raceService.live(id).subscribe(items => (this.poniesWithPosition = items));
    }
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }
}
