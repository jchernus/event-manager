import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators/map';

import { AuthService} from '../auth.service';
import { RobotsService } from '../robots.service';
import { Robot } from '../robot';
// import { RobotModalComponent } from '../robot-modal/robot-modal.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  robots : Observable<any[]>;
  viewMode = 250;
  selectedState : string;

  @Input() public bot : Robot = {
    name : "N/A",
    weightClass : 250,
  };

  states = [
    "Ready for Safety",
    "Ready",
    "Repairing",
    "Scheduled"
  ]

  constructor(public auth: AuthService, private robotService: RobotsService, private modalService: NgbModal){}

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

  openRobotDetails(robotDetails, robotId : string) {
    this.robotService.getRobotDocData(robotId).subscribe(bot => {
        this.bot = bot;
        this.bot.id = robotId;
        const modalRef = this.modalService.open(robotDetails, {ariaLabelledBy: 'modal-basic-title'});
        modalRef.componentInstance.bot = this.bot;
      });
  }
}