import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('home init');
  }
}
