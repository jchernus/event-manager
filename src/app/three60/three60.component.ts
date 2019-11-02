import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-three60',
  templateUrl: './three60.component.html',
  styleUrls: ['./three60.component.css']
})
export class Three60Component implements OnInit {
  robots : Observable<any[]>;
  viewMode = 1;

  constructor(private robotService: RobotsService) { }

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
  }

  changeViewMode(weight: number){
    this.robots = this.robotService.getRobotsObservable(weight);
    this.viewMode = weight;
  }

  trackById (index, item) {
    return item.id;
  }

}