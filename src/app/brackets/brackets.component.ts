import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit {
  viewMode = 150;

  constructor() { }

  ngOnInit() {
  }

  changeViewMode(weight: number){
    this.viewMode = weight;
  }

}