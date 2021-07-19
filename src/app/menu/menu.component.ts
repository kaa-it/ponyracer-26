import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public navbarCollapsed: boolean;

  constructor() {
    this.navbarCollapsed = true;
  }

  ngOnInit(): void {
    console.log('menu init');
  }

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
