import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService} from '../auth.service';
import { RobotsService } from '../robots.service';
import { FightsService } from '../fights.service';
import { Fight } from '../fight';

@Component({
  selector: 'app-fight-history',
  templateUrl: './fight-history.component.html',
  styleUrls: ['./fight-history.component.css']
})
export class FightHistoryComponent implements OnInit {
  viewMode = 250;
  robots : Observable<any[]>;
  fights : Observable<any[]>;
  winnerBot : string;
  loserBot : string;
  ko : string;
  jd : string;

  constructor(public auth: AuthService, private robotService: RobotsService, private fightService: FightsService, private modalService: NgbModal) { }

  resultsForm = new FormGroup({
    winner: new FormControl(),
    loser: new FormControl(),
    ko: new FormControl(),
    jd: new FormControl()
    // TODO: Add weight class
  });

  ngOnInit() {
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    this.fights = this.fightService.getFightsObservable(this.viewMode);
  }

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
      ko: wonByKO,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      weightClass: this.viewMode,
    });

    // Send 'er off
    this.fightService.addFight(fight);

    // Clear form
    this.winnerBot = "";
    this.loserBot = "";
    this.jd = "";
    this.ko = "";
  }

  openResultsModal(resultsModal) {
    const modalRef = this.modalService.open(resultsModal, {ariaLabelledBy: 'results-modal'});
  }

  changeViewMode(weight: number){
    this.viewMode = weight;
    this.robots = this.robotService.getRobotsObservable(this.viewMode);
    this.fights = this.fightService.getFightsObservable(this.viewMode);
  }
}