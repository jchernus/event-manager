import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-robot-standings',
  templateUrl: './robot-standings.component.html',
  styleUrls: ['./robot-standings.component.css']
})
export class RobotStandingsComponent implements OnInit {
  robots : Observable<any[]>;
  viewMode = 250;

  constructor(private robotService: RobotsService){}

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservableByStandings(250);
  }

  changeViewMode(weight: number){
    this.robots = this.robotService.getRobotsObservableByStandings(weight);
    this.viewMode = weight;
  }

}