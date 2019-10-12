import { environment } from './../environments/environment'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RobotListComponent } from './robot-list/robot-list.component';
import { RobotDetailsComponent } from './robot-details/robot-details.component';
import { FightScheduleComponent } from './fight-schedule/fight-schedule.component';
import { RobotStandingsComponent } from './robot-standings/robot-standings.component';
import { FightsService } from './fights.service';
import { RobotsService } from './robots.service';
import { ImportBotsComponent } from './import-bots/import-bots.component';
import { ScheduleFightComponent } from './schedule-fight/schedule-fight.component';
import { FightHistoryComponent } from './fight-history/fight-history.component';
import { RecordResultComponent } from './record-result/record-result.component';
import { ScheduleService } from './schedule.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth.service';
import { CheckinComponent } from './checkin/checkin.component';
import { SafetyComponent } from './safety/safety.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: FightScheduleComponent },
      { path: 'robots', component: RobotListComponent },
      { path: 'robot/:robotId', component: RobotDetailsComponent },
      { path: 'schedule', component: FightScheduleComponent },
      { path: 'results', component: FightHistoryComponent },
      { path: 'standings', component: RobotStandingsComponent },
      { path: 'import', component: ImportBotsComponent },
      { path: 'check-in', component: CheckinComponent },
      { path: 'safety', component: SafetyComponent },
      { path: '**', component: NotFoundComponent },
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    RobotListComponent,
    RobotDetailsComponent,
    FightScheduleComponent,
    RobotStandingsComponent,
    ImportBotsComponent,
    ScheduleFightComponent,
    FightHistoryComponent,
    RecordResultComponent,
    NotFoundComponent,
    TimeAgoPipe,
    CheckinComponent,
    SafetyComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [FightsService, RobotsService, ScheduleService, AuthService]
})
export class AppModule { }