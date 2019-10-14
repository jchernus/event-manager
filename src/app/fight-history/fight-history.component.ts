import { Component, OnInit } from '@angular/core';

import { AuthService} from '../auth.service';
import { FightsService } from '../fights.service';
import { Fight } from '../fight';

@Component({
  selector: 'app-fight-history',
  templateUrl: './fight-history.component.html',
  styleUrls: ['./fight-history.component.css']
})
export class FightHistoryComponent implements OnInit {
  fights:Fight[];

  constructor(public auth: AuthService, private fightService: FightsService) { }

  ngOnInit() {
    this.fightService.getFights().subscribe(data => {
      this.fights = data.map(e => {
        return {
          id: e.payload.doc.id,
          winner: e.payload.doc.data()['winner'],
          loser: e.payload.doc.data()['loser'],
          ko: e.payload.doc.data()['ko'],
          weightClass: e.payload.doc.data()['weightClass'],
          timestamp: e.payload.doc.data()['timestamp']
        } as Fight;
      })
    });
  }

  create(fight: Fight){
    this.fightService.addFight(fight);
  }

  delete(id: string) {
    // this.fightService.deleteFight(id);
  }
}