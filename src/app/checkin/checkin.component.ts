import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  robots : Observable<any[]>;
  viewMode = 250;

  constructor(private robotService: RobotsService) { }

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
  }

  changeViewMode(weight: number){
    this.robots = this.robotService.getRobotsObservable(weight);
    this.viewMode = weight;
  }

  trackById (index, item) {
    return item.id;
  }
}