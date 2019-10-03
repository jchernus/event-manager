import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Robot } from '../robot';
import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-robot-details',
  templateUrl: './robot-details.component.html',
  styleUrls: ['./robot-details.component.css']
})
export class RobotDetailsComponent implements OnInit {
  robot: Robot;
  
  constructor(
    private route: ActivatedRoute,
    private robotService: RobotsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let myVal = +params.get('robotId');
      console.log(myVal);
      this.robotService.getRobot(myVal);
    });
  }
}