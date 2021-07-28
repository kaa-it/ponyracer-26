import { Component, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  raceModel: RaceModel | null = null;
  betFailed = false;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const raceId = this.route.snapshot.paramMap.get('raceId');
    const id = Number(raceId);
    if (!isNaN(id)) {
      this.raceService.get(id).subscribe(race => (this.raceModel = race));
    }
  }

  betOnPony(pony: PonyModel): void {
    this.raceService.bet(this.raceModel!.id, pony.id).subscribe({
      next: race => (this.raceModel = race),
      error: () => (this.betFailed = true)
    });
  }

  isPonySelected(pony: PonyModel): boolean {
    return pony.id === this.raceModel!.betPonyId;
  }
}
