import { Component,} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-robot-details',
  templateUrl: './robot-details.component.html',
  styleUrls: ['./robot-details.component.css']
})
export class RobotDetailsComponent {
  viewMode = 1;
  
  constructor(
    private robotService: RobotsService, 
    private modalService: NgbModal
  ) { }

  initializeRobot(botId){
    this.robotService.initializeBot(botId, this.viewMode);
  }
}