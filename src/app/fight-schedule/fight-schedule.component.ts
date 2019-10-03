import { Component, OnInit } from '@angular/core';

import { FightsService } from '../fights.service';
import { Fight } from '../fight';

@Component({
  selector: 'app-fight-schedule',
  templateUrl: './fight-schedule.component.html',
  styleUrls: ['./fight-schedule.component.css']
})
export class FightScheduleComponent implements OnInit {
  fights:Fight[];

  constructor(private fightService: FightsService) { }

  ngOnInit() {
    this.fightService.getFights().subscribe(data => {
      this.fights = data.map(e => {
        return {
          id: e.payload.doc.id,
          winner: e.payload.doc.data()['winner'],
          loser: e.payload.doc.data()['loser'],
          //timestamp: e.payload.doc.data()['timestamp']
        } as Fight;
      })
      console.log(this.fights);
    });
  }

  create(fight: Fight){
    this.fightService.addFight(fight);
  }

  delete(id: string) {
    this.fightService.deleteFight(id);
  }
}