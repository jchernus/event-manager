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
  }

  create(fight: Fight){
    this.fightService.addFight(fight);
  }

  delete(id: string) {
    this.fightService.deleteFight(id);
  }
}