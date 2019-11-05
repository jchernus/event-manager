import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent implements OnInit {
  robots : Observable<any[]>;
  viewMode = 130;

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