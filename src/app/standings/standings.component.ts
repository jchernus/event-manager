import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  robots : Observable<any[]>;
  viewMode = 1;

  constructor(private robotService: RobotsService){}

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservableByStandings(this.viewMode);
  }

  changeViewMode(weight: number){
    this.robots = this.robotService.getRobotsObservableByStandings(weight);
    this.viewMode = weight;
  }

  trackById (index, item) {
    return item.id;
  }

}