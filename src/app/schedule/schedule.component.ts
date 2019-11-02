import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  viewMode = "Combat";
  robots : Observable<any[]>;
  schedule : Observable<any[]>;
  currentMatch;
  redBot : string;
  blueBot : string;
  breakDuration : number = 30;
  winnerBot : string;
  loserBot : string;
  ko : string;
  jd : string;

  durations = [5, 15, 30, 60];

  constructor(public auth: AuthService, private robotService: RobotsService, private scheduleService: ScheduleService, private fightService: FightsService, private modalService: NgbModal) { }

  scheduleForm = new FormGroup({
    red: new FormControl('', Validators.required),
    blue: new FormControl('', Validators.required)
  });

  breakForm = new FormGroup({
    breakTime: new FormControl('', Validators.required)
  });
  
  resultsForm = new FormGroup({
    winner: new FormControl('', [
      Validators.required,
      
    ]),
    loser: new FormControl('', Validators.required),
    ko: new FormControl('', Validators.required),
    jd: new FormControl('', Validators.required)
    // TODO: Add weight class
  });

  ngOnInit() {
    this.robots = this.robotService.getAllRobotsObservable(this.viewMode);
    this.schedule = this.scheduleService.getScheduleByArena(this.viewMode);
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

  clearScheduleFightForm(){
    this.redBot = "";
    this.blueBot = "";
  }

  scheduleFight(close : boolean){
    // Validation
    if (this.redBot === this.blueBot){
      this.scheduleForm.setErrors({
        botValues: true
      });
      console.log("Red square bot & blue square bot should be different.");
      return;
    }

    if (this.redBot === undefined || this.redBot === ""){
      this.scheduleForm.get('red').setErrors({
        required: true
      });
      console.log("Red bot is undefined.");
      return;
    }

    if (this.blueBot === undefined || this.blueBot === ""){
      this.scheduleForm.get('blue').setErrors({
        required: true
      });
      console.log("Blue bot is undefined.");
      return;
    }

    // Schedule a fight
    this.scheduleService.addMatch(this.viewMode, this.redBot, this.blueBot);

    // Clear the form
    this.clearScheduleFightForm();

    // Close the modal?
    if (close){
      this.modalService.dismissAll();
    }
  }

  scheduleBreak(){
    // Don't need validation, because an option is selected initially
    this.scheduleService.addBreak(this.viewMode, this.breakDuration);
    this.breakDuration = 30; // default duration
    this.modalService.dismissAll();
  }

  clearRecordResultForm(){
    this.winnerBot = "";
    this.loserBot = "";
    this.jd = "";
    this.ko = "";
  }

  recordResult(){
    let arena = this.viewMode;

    // Check the form
    if (this.winnerBot === this.loserBot){
      this.resultsForm.setErrors({
        botValues: true
      });
      return;
    }

    if (this.ko === this.jd){
      console.log("KO & JD not filled out");
      this.resultsForm.setErrors({
        winCondition: true
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
    });

    // Send 'er off
    this.fightService.addFight(fight);

    // Clear the currently fighting section
    this.scheduleService.clearCurrentMatch(arena);

    // Clear form
    this.clearRecordResultForm();

    // Close modal
    this.modalService.dismissAll();
  }

  promoteToCurrentMatch(redSquare, blueSquare, matchID){
    if (this.currentMatch){
      // Another match is already marked as current
      // TODO: Throw an error
    } else {
      // Make it so!
      this.scheduleService.promoteToCurrentMatch(this.viewMode, redSquare, blueSquare, matchID);
    }
  }

  postponeMatch(){
    let arena = this.viewMode;
    this.scheduleService.addMatch(arena, this.currentMatch.redSquare, this.currentMatch.blueSquare);
    this.scheduleService.clearCurrentMatch(arena);
  }

  updateSelection(optionChanged){
    if (optionChanged == "winner"){
      if (this.winnerBot == this.currentMatch.redSquare){
        this.loserBot = this.currentMatch.blueSquare;
      } else {
        this.loserBot = this.currentMatch.redSquare;
      }
    } else if (optionChanged == "loser"){
      if (this.loserBot == this.currentMatch.redSquare){
        this.winnerBot = this.currentMatch.blueSquare;
      } else {
        this.winnerBot = this.currentMatch.redSquare;
      }
    }
  }

  changeViewMode(arena: string){
    this.viewMode = arena;
    this.robots = this.robotService.getAllRobotsObservable();
    this.schedule = this.scheduleService.getScheduleByArena(this.viewMode);
    this.scheduleService.getCurrentFight(this.viewMode).subscribe(match => this.currentMatch = match);
  }

  trackById (index, item) {
    return item.id;
  }
}