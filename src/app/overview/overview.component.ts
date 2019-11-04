import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
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
  viewMode = 1;
  selectedState : string;

  @Input() public bot : Robot = {
    name : "N/A",
    weightClass : 250,
  };

  states = [
    "N/A",
    "Ready for Safety",
    "Ready",
    "Scheduled",
    "Repairing",
    "Disqualified",
    "Dead"
  ]
  
  // addRobot = new FormGroup({
  //   winner: new FormControl('', Validators.required),
  //   loser: new FormControl('', Validators.required),
  //   ko: new FormControl('', Validators.required),
  //   jd: new FormControl('', Validators.required)
  //   // TODO: Add weight class
  // });

  constructor(public auth: AuthService, private robotService: RobotsService, private modalService: NgbModal){}

  ngOnInit() {
    this.robots = this.robotService.getRobotsByWeightObservable(this.viewMode);
  }

  initializeBots(){
    this.robotService.initializeAllBots();
  }

  changeViewMode(weight: number){
    this.robots = this.robotService.getRobotsByWeightObservable(weight);
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

  addRobot(addRobotModal) {
    const modalRef = this.modalService.open(addRobotModal, {ariaLabelledBy: 'modal-basic-title'});
  }

  // clearRecordResultForm(){
  //   this.winnerBot = "";
  //   this.loserBot = "";
  //   this.jd = "";
  //   this.ko = "";
  // }

  trackById (index, item) {
    return item.id;
  }
}