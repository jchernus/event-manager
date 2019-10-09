import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit {
  robots : Observable<any[]>;
  viewMode = 250;

  constructor(private robotService: RobotsService){}

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(250);
  }
  

  initializeBot(robotId : string){
    this.robotService.initializeBot(robotId);
  }

  initializeBots(){
    this.robotService.initializeAllBots();
  }

  changeViewMode(weight: number){
    this.robots = this.robotService.getRobotsObservable(weight);
    this.viewMode = weight;
  }

  // create(robot: Robot){
  //   this.robotService.addRobot(robot, weightClass);
  // }

  // delete(id: string) {
  //   this.robotService.deleteRobot(id);
  // }
}