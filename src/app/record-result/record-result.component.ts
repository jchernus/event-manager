import { Component, OnInit } from '@angular/core';
import { FightsService } from '../fights.service';
import { Fight } from '../fight';

@Component({
  selector: 'app-record-result',
  templateUrl: './record-result.component.html',
  styleUrls: ['./record-result.component.css']
})
export class RecordResultComponent implements OnInit {

  constructor(private fightService: FightsService) { }

  ngOnInit() {
  }

  addFight(){
    fight: Fight;

    // Populate fight from information entered in the form
    

    this.fightService.addFight(fight);
  }

}