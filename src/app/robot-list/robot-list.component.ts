import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RobotsService } from '../robots.service';
import { RobotModalComponent } from './robot-modal/robot-modal.component';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit {
  robots : Observable<any[]>;
  viewMode = 250;

  constructor(private robotService: RobotsService, private modalService: NgbModal){}

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
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

  openRobotDetails(content, robotId : number) {
    this.modalService.open(RobotModalComponent, {ariaLabelledBy: 'modal-basic-title'});
  }

  // create(robot: Robot){
  //   this.robotService.addRobot(robot, weightClass);
  // }

  // delete(id: string) {
  //   this.robotService.deleteRobot(id);
  // }
}