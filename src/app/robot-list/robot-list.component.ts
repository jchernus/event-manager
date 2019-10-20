import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators/map';

import { RobotsService } from '../robots.service';
import { RobotModalComponent } from '../robot-modal/robot-modal.component';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit {
  robots : Observable<any[]>;
  viewMode = 250;

  @Input() public bot = {
    name: 'Robot Name',
    weightClass: 250
  };

  constructor(private robotService: RobotsService, private modalService: NgbModal){}

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    console.log(this.bot);
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

  openRobotDetails(content, robotId : string) {

    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.bot = this.bot;
  }

  // create(robot: Robot){
  //   this.robotService.addRobot(robot, weightClass);
  // }

  // delete(id: string) {
  //   this.robotService.deleteRobot(id);
  // }
}