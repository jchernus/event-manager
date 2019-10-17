import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';
import { ScheduleService } from '../schedule.service';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-fight-schedule',
  templateUrl: './fight-schedule.component.html',
  styleUrls: ['./fight-schedule.component.css']
})
export class FightScheduleComponent implements OnInit {
  viewMode = 250;
  robots : Observable<any[]>;
  schedule : Observable<any[]>;
  redBot : string;
  blueBot : string;

  constructor(public auth: AuthService, private robotService: RobotsService, private scheduleService: ScheduleService) { }

  scheduleForm = new FormGroup({
    red: new FormControl(),
    blue: new FormControl()
  });

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    this.schedule = this.scheduleService.getSchedule(this.viewMode);
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

  changeViewMode(weight: number){
    this.viewMode = weight;
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    this.schedule = this.scheduleService.getSchedule(this.viewMode);
  }
}