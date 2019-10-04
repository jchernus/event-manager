import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';
import { Robot } from '../robot';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit {
  robots : Observable<any[]>;

  constructor(private robotService: RobotsService){}

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable();
    console.log(this.robots);
  }

  // create(robot: Robot){
  //   this.robotService.addRobot(robot);
  // }

  // delete(id: string) {
  //   this.robotService.deleteRobot(id);
  // }
}