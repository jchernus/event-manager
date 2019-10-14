import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ScheduleService } from '../schedule.service';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-fight-schedule',
  templateUrl: './fight-schedule.component.html',
  styleUrls: ['./fight-schedule.component.css']
})
export class FightScheduleComponent implements OnInit {
  schedule : Observable<any[]>;

  constructor(public auth: AuthService, private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.schedule = this.scheduleService.getSchedule();
  }

  deleteMatch(id: string) {
    this.scheduleService.deleteMatch(id);
  }
}