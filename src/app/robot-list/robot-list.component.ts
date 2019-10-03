import { Component } from '@angular/core';

import { RobotsService } from '../robots.service';
import { Robot } from '../robot';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent {
  robots: Robot[];
  robotsObservable;

  constructor(private robotService: RobotsService){}

  ngOnInit() {
    this.robotsObservable = this.robotService.getRobotsObservable();

    this.robotsObservable.subscribe(data => {
      this.robots = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          state: e.payload.doc.data()['state'],
          //timestamp: e.payload.doc.data()['timestamp']
        } as Robot;
      })
      console.log(this.robots);
    });
  }

  // create(robot: Robot){
  //   this.robotService.addRobot(robot);
  // }

  // delete(id: string) {
  //   this.robotService.deleteRobot(id);
  // }
}