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
    ko: new FormControl(),
    jd: new FormControl()
  });

  addFight(){
    // Check the form
    if (this.winnerBot === this.loserBot){
      this.resultsForm.setErrors({
        botValues: true
      });
      return;
    }
    
    // Populate fight from information entered in the form

    let wonByKO : boolean = false;
    if (this.ko === "ko"){
      wonByKO = true;
    }

    let fight = <Fight>({
      winner: this.winnerBot,
      loser: this.loserBot,
      ko: wonByKO
    });

    console.log(fight);

    // Send 'er off
    this.fightService.addFight(fight);
  }

}