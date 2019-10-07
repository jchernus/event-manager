import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';
import { ScheduleService } from '../schedule.service';
// import { FightsService } from '../fights.service';

@Component({
  selector: 'app-schedule-fight',
  templateUrl: './schedule-fight.component.html',
  styleUrls: ['./schedule-fight.component.css']
})
export class ScheduleFightComponent implements OnInit {
  robots : Observable<any[]>;
  redBot : string;
  blueBot : string;

  constructor(private robotService: RobotsService, private scheduleService: ScheduleService) { }

  scheduleForm = new FormGroup({
    red: new FormControl(),
    blue: new FormControl()
  });

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(250);
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
    this.scheduleService.addMatch(this.redBot, this.blueBot);
  }
}