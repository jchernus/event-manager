import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RobotsService } from '../robots.service';
import { ScheduleService } from '../schedule.service';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  viewMode = 250;
  robots : Observable<any[]>;
  schedule : Observable<any[]>;
  currentlyFighting;
  redBot : string;
  blueBot : string;
  breakDuration : number;

  durations = [5, 10, 15, 30, 60];

  constructor(public auth: AuthService, private robotService: RobotsService, private scheduleService: ScheduleService, private modalService: NgbModal) { }

  scheduleForm = new FormGroup({
    red: new FormControl(),
    blue: new FormControl()
  });

  breakForm = new FormGroup({
    breakTime: new FormControl()
  });

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    this.schedule = this.scheduleService.getSchedule(this.viewMode);
    this.scheduleService.getCurrentFight(this.viewMode).subscribe(match => this.currentlyFighting = match);
  }

  openScheduleFightModal(scheduleFightModal) {
    const modalRef = this.modalService.open(scheduleFightModal, {ariaLabelledBy: 'schedule-fight-modal'});
  }

  openScheduleBreakModal(scheduleBreakModal) {
    const modalRef = this.modalService.open(scheduleBreakModal, {ariaLabelledBy: 'schedule-break-modal'});
  }

  scheduleFight(){
    // Check the form
    if (this.redBot === this.blueBot){
      this.scheduleForm.setErrors({
        botValues: true
      });
      return;
    }

    // Schedule a fight
    this.scheduleService.addMatch(this.viewMode, this.redBot, this.blueBot);

    // Clear the form
    this.redBot = "";
    this.blueBot = "";
  }

  scheduleBreak(){
    this.scheduleService.addBreak(this.viewMode, this.breakDuration);
  }

  changeViewMode(weight: number){
    this.viewMode = weight;
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    this.schedule = this.scheduleService.getSchedule(this.viewMode);
    this.scheduleService.getCurrentFight(this.viewMode).subscribe(match => this.currentlyFighting = match);
  }
}