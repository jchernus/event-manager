import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators/map';

import * as MyJSThingy from './js/import-robots.js';

@Injectable()
export class RobotsService {
  robots;

  constructor(private firestore: AngularFirestore) { 
  }

  getRobotsObservable() {
    this.robots = this.firestore.collection('robots').snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));

    return this.robots;
  }

  getRobotDoc(robotId : string) {
    return this.firestore.doc('robots/' + robotId).valueChanges();
  }
  
  importBots(){
    //MyJSThingy.importRobots();
  }

  initializeBot(robotId : string){
    // Add all of the other fields to the documents & initialize
    // to something reasonable
    this.firestore.doc('robots/' + robotId)
      .update({
        inAttendance : false,
        passedSafety : false,
        state : "N/A"
      });
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

  addRobot(){
    return this.firestore.collection('robots').add({

    });
  }

  deleteRobot(robotId: string){
      this.firestore.doc('robots/' + robotId).delete();
  }
}