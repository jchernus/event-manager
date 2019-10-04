import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Robot } from './robot';

import { map } from 'rxjs/operators/map';

import * as MyJSThingy from './assets/js/import-robots';

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
  
  importBot(){
    MyJSThingy.importRobots();
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

  // addRobot(robot: Robot){
  //   return this.firestore.collection('robots').add(robot);
  // }

  // deleteRobot(robotId: string){
  //     this.firestore.doc('robots/' + robotId).delete();
  // }
}