import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators/map';

import { Robot } from './robot';

@Injectable()
export class ScheduleService {
  schedule;
  bots = [];

  constructor(private firestore: AngularFirestore) { }

  getSchedule(){
    return this.firestore.collection('fightSchedule').snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  addMatch(redBot: string, blueBot: string){
    // Update the fights collection
    this.firestore.collection('fightSchedule').add({
      redSquare: redBot,
      blueSquare: blueBot,
      //timestamp
    });

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
          this.updateBotSchedule(this.bots[0]);
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
          this.updateBotSchedule(this.bots[0]);
          updateBlue = false;
        }
    });
  }

  updateBotSchedule(robot: Robot) {
    this.firestore.doc('robots/' + robot.id)
      .update({
        state: "Scheduled"
        // TODO: Append a new array item to 'scheduledFights'
      })
      .then(function() {
          console.log("Robot successfully updated with new schedule!");
      })
      .catch(function(error) {
          console.error("Error updating schedule of robot: ", error);
      });
  }

  deleteMatch(id: string){

  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

}