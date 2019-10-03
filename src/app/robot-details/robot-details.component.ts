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
  robotObservable;
  
  constructor(
    private route: ActivatedRoute,
    private robotService: RobotsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let robotID = params.get('robotId');
      console.log(robotID);
      
      this.robotService.getRobotDoc(robotID).snapshotChanges()
      .subscribe(data => {
        //console.log(data.data());
      })
    });
  }
}