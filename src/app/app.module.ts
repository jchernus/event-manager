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
import { NavbarComponent } from './navbar/navbar.component';
import { OverviewComponent } from './overview/overview.component';
import { RobotDetailsComponent } from './robot-details/robot-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';
import { FightsService } from './fights.service';
import { RobotsService } from './robots.service';
import { SetupComponent } from './setup/setup.component';
import { ResultsComponent } from './results/results.component';
import { ScheduleService } from './schedule.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';
import { ModeratorGuard } from './moderator.guard';
import { CheckinComponent } from './checkin/checkin.component';
import { SafetyComponent } from './safety/safety.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ScheduleComponent },
      { path: 'overview', component: OverviewComponent, canActivate: [ModeratorGuard] },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'standings', component: StandingsComponent },
      { path: 'setup', component: SetupComponent , canActivate: [AdminGuard] },
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
    NavbarComponent,
    OverviewComponent,
    RobotDetailsComponent,
    ScheduleComponent,
    StandingsComponent,
    SetupComponent,
    ResultsComponent,
    NotFoundComponent,
    TimeAgoPipe,
    CheckinComponent,
    SafetyComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [FightsService, RobotsService, ScheduleService, AuthService, AdminGuard, ModeratorGuard]
})
export class AppModule { }