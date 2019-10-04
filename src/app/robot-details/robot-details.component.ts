import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-robot-details',
  templateUrl: './robot-details.component.html',
  styleUrls: ['./robot-details.component.css']
})
export class RobotDetailsComponent implements OnInit {
  robot : Observable<any>;
  
  constructor(
    private route: ActivatedRoute,
    private robotService: RobotsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let robotID = params.get('robotId');
      this.robotService.getRobotDoc(robotID)
            .subscribe(bot => this.robot = bot);
    });
  }

  initializeRobot(bot){
    this.robotService.initializeBot(bot);
  }
}