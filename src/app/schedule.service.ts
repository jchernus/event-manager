import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators/map';
import * as firebase from 'firebase/app';

import { Robot } from './robot';

@Injectable()
export class ScheduleService {
  schedule;
  bots = [];

  constructor(private firestore: AngularFirestore) { }

  getSchedule(){
    return this.firestore.collection('fightSchedule', ref => ref.orderBy('timestamp', 'asc')).snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  addMatch(redBot: string, blueBot: string){
    // Update the fights collection
    this.firestore.collection('fightSchedule').add({
      redSquare: redBot,
      blueSquare: blueBot,
      //timestamp: firebase.firestore.FieldValue.serverTimestamp()
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });

    // TODO: Combine the following two, if possible - use forEach?
    // Update the robot's states to "Scheduled"
    let updateRed = true;
    this.firestore.collection('robots', ref => ref.where('name', '==', redBot)).snapshotChanges()
      .subscribe(data => {
        this.bots = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            state: e.payload.doc.data()['state']
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateRed) {
          this.updateBotSchedule(this.bots[0], true);
          updateRed = false;
        }
    });

    // Update the robot's states to "Scheduled"
    let updateBlue = true;
    this.firestore.collection('robots', ref => ref.where('name', '==', blueBot)).snapshotChanges()
      .subscribe(data => {
        this.bots = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            state: e.payload.doc.data()['state']
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateBlue) {
          this.updateBotSchedule(this.bots[0], true);
          updateBlue = false;
        }
    });
  }

  updateBotSchedule(robot: Robot, schedule: boolean) {
    let newState = "Scheduled";
    if (!schedule){
      newState = "Ready";
    }
    this.firestore.doc('robots/' + robot.id)
      .update({
        state: newState
        // TODO: Append a new array item to 'scheduledFights'
      })
      .then(function() {
          console.log("Robot successfully updated with new schedule!");
      })
      .catch(function(error) {
          console.error("Error updating schedule of robot: ", error);
      });
  }

  deleteMatch(redBot: string, blueBot: string, matchId: string){
    // Change robot statuses to 'ready' instead of 'scheduled'
    // TODO: Combine the following two, if possible - use forEach?
    // Update the robot's states to "Scheduled"
    let updateRed = true;
    this.firestore.collection('robots', ref => ref.where('name', '==', redBot)).snapshotChanges()
      .subscribe(data => {
        this.bots = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            state: e.payload.doc.data()['state']
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateRed) {
          this.updateBotSchedule(this.bots[0], false);
          updateRed = false;
        }
    });

    // Update the robot's states to "Scheduled"
    let updateBlue = true;
    this.firestore.collection('robots', ref => ref.where('name', '==', blueBot)).snapshotChanges()
      .subscribe(data => {
        this.bots = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            state: e.payload.doc.data()['state']
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateBlue) {
          this.updateBotSchedule(this.bots[0], false);
          updateBlue = false;
        }
    });

    // Delete match from fightSchedule
    this.firestore.doc('fightSchedule/' + matchId).delete()
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

}