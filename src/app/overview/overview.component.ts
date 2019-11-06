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
  viewMode = 150;
  selectedState : string;

  name: string;
  weightClass: number = this.viewMode;
  arrived: boolean;
  safety: boolean;

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
  
  addRobotForm = new FormGroup({
    botName: new FormControl('', Validators.required),
    botWeight: new FormControl('', Validators.required),
    botArrived: new FormControl('', Validators.required),
    botSafety: new FormControl('', Validators.required)
  });
  
  updateRobotForm = new FormGroup({
    robotName: new FormControl('', Validators.required),
    robotState: new FormControl('', Validators.required),
    robotArrived: new FormControl('', Validators.required),
    robotSafety: new FormControl('', Validators.required)
  });

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

  openAddRobotModal(addRobotModal) {
    this.weightClass = this.viewMode;
    const modalRef = this.modalService.open(addRobotModal, {ariaLabelledBy: 'modal-basic-title'});
  }

  addRobot(){
    let arena = "Big";
    let weightClass = +this.weightClass;
    if (weightClass <= 3 || weightClass === 150){
      arena = "Small";
    }

    // Add the robot   
    this.robotService.addRobot(this.name, weightClass, arena, !!this.arrived, !!this.safety);

    // Clear form
    this.clearAddRobotForm();
  }

  clearAddRobotForm(){
    this.name = "";
    //weightClass is set when the modal opens
    this.state = "N/A";
    this.arrived = false;
    this.safety = false;
  }

  trackById (index, item) {
    return item.id;
  }
}