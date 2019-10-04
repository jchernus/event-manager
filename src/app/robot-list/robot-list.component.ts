import { Component, OnInit, OnDestroy } from '@angular/core';

import { RobotsService } from '../robots.service';
import { Robot } from '../robot';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit, OnDestroy {
  robots: Robot[];
  robotsObservable;
  subscription;

  constructor(private robotService: RobotsService){}

  ngOnInit() {
    this.robotsObservable = this.robotService.getRobotsObservable();

    this.subscription = this.robotsObservable.subscribe(
      data => {
      this.robots = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          state: e.payload.doc.data()['state'],
          //timestamp: e.payload.doc.data()['timestamp']
        } as Robot;
      });
    }, 
    error => {
      console.log("An unexpected error occured: " + error);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  // create(robot: Robot){
  //   this.robotService.addRobot(robot);
  // }

  // delete(id: string) {
  //   this.robotService.deleteRobot(id);
  // }
}