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
  viewMode = 1;

  constructor(private robotService: RobotsService) { }

  ngOnInit() {
    this.robots = this.robotService.getRobotsByWeightObservable(this.viewMode);
  }

  changeViewMode(weight: number){
    this.robots = this.robotService.getRobotsByWeightObservable(weight);
    this.viewMode = weight;
  }

  trackById (index, item) {
    return item.id;
  }
}