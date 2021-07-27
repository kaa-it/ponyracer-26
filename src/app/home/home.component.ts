import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'pr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userEventsSubscription: Subscription | null = null;
  user: UserModel | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('home init');

    this.userEventsSubscription = this.userService.userEvents.subscribe({
      next: user => (this.user = user)
    });
  }

  ngOnDestroy() {
    if (this.userEventsSubscription !== null) {
      this.userEventsSubscription.unsubscribe();
    }
  }
}
