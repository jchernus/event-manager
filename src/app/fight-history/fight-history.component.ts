import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FightsService } from '../fights.service';
import { Fight } from '../fight';

@Component({
  selector: 'app-fight-history',
  templateUrl: './fight-history.component.html',
  styleUrls: ['./fight-history.component.css']
})
export class FightHistoryComponent implements OnInit {
  fights : Observable<any[]>;
  viewMode = 250;

  constructor(private fightService: FightsService) { }

  ngOnInit() {
    this.fightService.getFightsObservable(this.viewMode);
  }
  

  create(fight: Fight){
    this.fightService.addFight(fight);
  }

  delete(id: string) {
    // this.fightService.deleteFight(id);
  }

  changeViewMode(weight: number){
    this.fights = this.fightService.getFightsObservable(weight);
    this.viewMode = weight;
    console.log(this.fights);
  }
}