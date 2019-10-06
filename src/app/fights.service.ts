import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Fight } from './fight';
import { Robot } from './robot';

import { map } from 'rxjs/operators/map';

@Injectable()
export class FightsService {
  fights = [];
  bots = [];

  constructor(private firestore: AngularFirestore) { 

  }

  getFights(){
    return this.firestore.collection('fightHistory').snapshotChanges();
  }

  addFight(fight : Fight){
    // Update the fights collection
    this.firestore.collection('fightHistory').add(fight);

    // Update the winning robot's doc
    let updateWinner = true;
    this.firestore.collection('robots', ref => ref.where('name', '==', fight.winner)).snapshotChanges()
      .subscribe(data => {
        this.bots = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            state: 'Repairing',
            fightCount: e.payload.doc.data()['fightCount'],
            winCount: e.payload.doc.data()['winCount'],
            lossCount: e.payload.doc.data()['lossCount'],
            koCount: e.payload.doc.data()['koCount'],
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateWinner) {
          this.incrementWinCount(this.bots[0], true);
          updateWinner = false;
        }
    });

    // Update the losing robot's doc
    let updateLoser = true;
    this.firestore.collection('robots', ref => ref.where('name', '==', fight.loser)).snapshotChanges()
      .subscribe(data => {
        this.bots = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            state: 'Repairing',
            fightCount: e.payload.doc.data()['fightCount'],
            winCount: e.payload.doc.data()['winCount'],
            lossCount: e.payload.doc.data()['lossCount'],
            koCount: e.payload.doc.data()['koCount'],
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateLoser) {
          this.incrementLossCount(this.bots[0]);
          updateLoser = false;
        }
    });
  }

  incrementWinCount(robot: Robot, ko : boolean) {
    this.firestore.doc('robots/' + robot.id)
      .update({
        fightCount : robot.fightCount + 1,
        winCount : robot.winCount + 1,
        koCount : robot.koCount + +ko,
        // Append a new array item to 'fights'
      })
      .then(function() {
          console.log("Winning robot successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating winning robot: ", error);
      });
  }

  incrementLossCount(robot: Robot) {
    this.firestore.doc('robots/' + robot.id)
      .update({
        fightCount : robot.fightCount + 1,
        lossCount : robot.lossCount + 1
        // Append a new array item to 'fights'
      })
      .then(function() {
          console.log("Losing robot successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating losing robot: ", error);
      });
  }

  deleteFight(fightId: string){
      this.firestore.doc('fightHistory/' + fightId).delete();
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }
}