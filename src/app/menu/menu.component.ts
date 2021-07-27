import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  public navbarCollapsed: boolean;
  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;

  constructor(private userService: UserService, private router: Router) {
    this.navbarCollapsed = true;
  }

  ngOnInit(): void {
    console.log('menu init');

    this.userEventsSubscription = this.userService.userEvents.subscribe({
      next: user => (this.user = user)
    });
  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription !== null) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
