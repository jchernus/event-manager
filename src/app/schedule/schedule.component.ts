import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService} from '../auth.service';
import { RobotsService } from '../robots.service';
import { ScheduleService } from '../schedule.service';
import { FightsService } from '../fights.service';

import { Fight } from './fight';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  viewMode = 250;
  robots : Observable<any[]>;
  schedule : Observable<any[]>;
  currentMatch;
  redBot : string;
  blueBot : string;
  breakDuration : number;
  winnerBot : string;
  loserBot : string;
  ko : string;
  jd : string;

  durations = [5, 10, 15, 30, 60];

  constructor(public auth: AuthService, private robotService: RobotsService, private scheduleService: ScheduleService, private fightService: FightsService, private modalService: NgbModal) { }

  scheduleForm = new FormGroup({
    red: new FormControl(),
    blue: new FormControl()
  });

  breakForm = new FormGroup({
    breakTime: new FormControl()
  });
  
  resultsForm = new FormGroup({
    winner: new FormControl(),
    loser: new FormControl(),
    ko: new FormControl(),
    jd: new FormControl()
    // TODO: Add weight class
  });

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    this.schedule = this.scheduleService.getSchedule(this.viewMode);
    this.scheduleService.getCurrentFight(this.viewMode).subscribe(match => this.currentMatch = match);
  }

  openScheduleFightModal(scheduleFightModal) {
    const modalRef = this.modalService.open(scheduleFightModal, {ariaLabelledBy: 'schedule-fight-modal'});
  }

  openScheduleBreakModal(scheduleBreakModal) {
    const modalRef = this.modalService.open(scheduleBreakModal, {ariaLabelledBy: 'schedule-break-modal'});
  }
  
  openResultsModal(resultsModal) {
    const modalRef = this.modalService.open(resultsModal, {ariaLabelledBy: 'results-modal'});
    modalRef.componentInstance.currentMatch = this.currentMatch;
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
    this.scheduleService.addMatch(this.viewMode, this.redBot, this.blueBot);

    // Clear the form
    this.redBot = "";
    this.blueBot = "";
  }

  scheduleBreak(){
    this.scheduleService.addBreak(this.viewMode, this.breakDuration);
  }

  addFight(){
    let weightClass = this.viewMode;

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
      ko: wonByKO,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      weightClass: weightClass,
    });

    // Send 'er off
    this.fightService.addFight(fight);

    // Clear the currently fighting section
    this.scheduleService.clearCurrentMatch(weightClass);

    // Clear form
    this.winnerBot = "";
    this.loserBot = "";
    this.jd = "";
    this.ko = "";
  }

  promoteToCurrentMatch(redSquare, blueSquare, matchID){
    if (this.currentMatch){
      // Another match is already marked as current
      // TODO: Throw an error
    } else {
      // Make it so!
      this.scheduleService.promoteToCurrent(this.viewMode, redSquare, blueSquare, matchID);
    }
  }

  updateSelection(){
    if (this.winnerBot != ""){
      if (this.winnerBot == this.currentMatch.redSquare){
        this.loserBot = this.currentMatch.blueSquare;
      } else {
        this.loserBot = this.currentMatch.redSquare;
      }
    } else if (this.loserBot != ""){
      if (this.loserBot == this.currentMatch.redSquare){
        this.winnerBot = this.currentMatch.blueSquare;
      } else {
        this.winnerBot = this.currentMatch.redSquare;
      }
    }
  }

  changeViewMode(weight: number){
    this.viewMode = weight;
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    this.schedule = this.scheduleService.getSchedule(this.viewMode);
    this.scheduleService.getCurrentFight(this.viewMode).subscribe(match => this.currentMatch = match);
  }
}