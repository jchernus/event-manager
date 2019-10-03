import { environment } from './../environments/environment'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RobotListComponent } from './robot-list/robot-list.component';
import { RobotDetailsComponent } from './robot-details/robot-details.component';
import { CartService } from './cart.service';
import { FightScheduleComponent } from './fight-schedule/fight-schedule.component';
import { RobotStandingsComponent } from './robot-standings/robot-standings.component';
import { FightsService } from './fights.service';
import { RobotsService } from './robots.service';
import { ImportBotsComponent } from './import-bots/import-bots.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: RobotListComponent },
      { path: 'robot/:robotId', component: RobotDetailsComponent },
      { path: 'schedule', component: FightScheduleComponent },
      { path: 'standings', component: RobotStandingsComponent },
      { path: 'import', component: ImportBotsComponent },
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    RobotListComponent,
    RobotDetailsComponent,
    FightScheduleComponent,
    RobotStandingsComponent,
    ImportBotsComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [CartService, FightsService, RobotsService]
})
export class AppModule { }