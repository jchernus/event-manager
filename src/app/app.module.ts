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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RobotListComponent } from './robot-list/robot-list.component';
import { RobotDetailsComponent } from './robot-details/robot-details.component';
import { FightScheduleComponent } from './fight-schedule/fight-schedule.component';
import { RobotStandingsComponent } from './robot-standings/robot-standings.component';
import { FightsService } from './fights.service';
import { RobotsService } from './robots.service';
import { ImportBotsComponent } from './import-bots/import-bots.component';
import { FightHistoryComponent } from './fight-history/fight-history.component';
import { ScheduleService } from './schedule.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';
import { ModeratorGuard } from './moderator.guard';
import { CheckinComponent } from './checkin/checkin.component';
import { SafetyComponent } from './safety/safety.component';
import { RobotModalComponent } from './robot-modal/robot-modal.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: FightScheduleComponent },
      { path: 'overview', component: RobotListComponent, canActivate: [ModeratorGuard] },
      { path: 'robot/:robotId', component: RobotDetailsComponent },
      { path: 'schedule', component: FightScheduleComponent },
      { path: 'results', component: FightHistoryComponent },
      { path: 'standings', component: RobotStandingsComponent },
      { path: 'import', component: ImportBotsComponent , canActivate: [AdminGuard] },
      { path: 'check-in', component: CheckinComponent , canActivate: [ModeratorGuard] },
      { path: 'safety', component: SafetyComponent , canActivate: [ModeratorGuard] },
      { path: '**', component: NotFoundComponent },
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    RobotListComponent,
    RobotDetailsComponent,
    FightScheduleComponent,
    RobotStandingsComponent,
    ImportBotsComponent,
    FightHistoryComponent,
    NotFoundComponent,
    TimeAgoPipe,
    CheckinComponent,
    SafetyComponent,
    RobotModalComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [FightsService, RobotsService, ScheduleService, AuthService, AdminGuard, ModeratorGuard]
})
export class AppModule { }