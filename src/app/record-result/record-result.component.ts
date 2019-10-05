import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { RobotsService } from '../robots.service';
import { FightsService } from '../fights.service';
import { Fight } from '../fight';

@Component({
  selector: 'app-record-result',
  templateUrl: './record-result.component.html',
  styleUrls: ['./record-result.component.css']
})
export class RecordResultComponent implements OnInit {
  robots : Observable<any[]>;
  winnerBot : string;
  loserBot : string;
  ko : string;
  jd : string;

  constructor(private robotService: RobotsService, private fightService: FightsService){}

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(250);
  }

  resultsForm = new FormGroup({
    winner: new FormControl(),
    loser: new FormControl(),
    ko: new FormControl()
  });

  addFight(){

    console.log("Loser is: " + this.loserBot);
    console.log("Winner is: " + this.winnerBot);
    console.log("KO is: " + this.ko);
    console.log("JD is: " + this.jd);

    // Check the form
    if (this.winnerBot === this.loserBot){
      this.resultsForm.setErrors({
        botValues: true
      });
    }

    let fight: Fight;

    // Populate fight from information entered in the form
    fight.winner = this.winnerBot;
    fight.loser = this.loserBot;

    this.fightService.addFight(fight);
  }

}