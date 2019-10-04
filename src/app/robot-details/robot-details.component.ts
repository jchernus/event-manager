import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Robot } from '../robot';
import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-robot-details',
  templateUrl: './robot-details.component.html',
  styleUrls: ['./robot-details.component.css']
})
export class RobotDetailsComponent implements OnInit, OnDestroy {
  robot: Robot;
  robotObservable;
  subscription;
  
  constructor(
    private route: ActivatedRoute,
    private robotService: RobotsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let robotID = params.get('robotId');
      console.log(robotID);
      
      this.subscription = this.robotService.getRobotDoc(robotID).snapshotChanges()
      .subscribe(
        data => {
          //console.log(data.data());
        }, 
        (error : Response) => {
          if (error.status === 404){
            console.log("Error: Robot not found.");
          } else {
            console.log("Error: " + error);
          }
        });
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}