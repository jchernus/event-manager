import { Component, OnInit } from '@angular/core';
import { FightsService } from '../fights.service';
import { Fight } from '../fight';

@Component({
  selector: 'app-schedule-fight',
  templateUrl: './schedule-fight.component.html',
  styleUrls: ['./schedule-fight.component.css']
})
export class ScheduleFightComponent implements OnInit {

  constructor(private fightService: FightsService) { }

  ngOnInit() {
  }

  addFight(){
    // Schedule a fight
  }

}