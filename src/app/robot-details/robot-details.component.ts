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
  robotID : string;
  robot : Observable<any>;
  robotPhotoURL : Observable<any>;
  
  constructor(
    private route: ActivatedRoute,
    private robotService: RobotsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.robotID = params.get('robotId');
    });
    this.robotService.getRobotDoc(this.robotID)
        .subscribe(bot => this.robot = bot);
        
    this.robotService.getRobotImage(13526)
        .subscribe(photoURL => this.robotPhotoURL = photoURL);
  }

  initializeRobot(bot){
    this.robotService.initializeBot(bot);
  }
}