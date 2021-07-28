import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {
  @Input() ponyModel!: PonyModel;
  @Input() isRunning = false;

  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();

  constructor() {}

  ngOnInit(): void {
    console.log('pony init');
  }

  clicked(): void {
    console.log(`pony ${this.ponyModel.name} clicked`);
    this.ponyClicked.emit(this.ponyModel);
  }

  getPonyImageUrl(): string {
    let suffix = '';
    if (this.isRunning) {
      suffix = '-running';
    }
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${suffix}.gif`;
  }
}
