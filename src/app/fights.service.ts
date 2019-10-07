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
            state: e.payload.doc.data()['state'],
            fightCount: e.payload.doc.data()['fightCount'],
            winCount: e.payload.doc.data()['winCount'],
            lossCount: e.payload.doc.data()['lossCount'],
            koCount: e.payload.doc.data()['koCount'],
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateWinner) {
          this.incrementWinCount(this.bots[0], 1, true);
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
            state: e.payload.doc.data()['state'],
            fightCount: e.payload.doc.data()['fightCount'],
            winCount: e.payload.doc.data()['winCount'],
            lossCount: e.payload.doc.data()['lossCount'],
            koCount: e.payload.doc.data()['koCount'],
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateLoser) {
          this.incrementLossCount(this.bots[0], 1);
          updateLoser = false;
        }
    });
  }

  deleteFight(fight: Fight){
    //this.firestore.doc('fightHistory/' + fight.id).delete();
    // Update the winning robot's doc
    let updateWinner = true;
    this.firestore.collection('robots', ref => ref.where('name', '==', fight.winner)).snapshotChanges()
      .subscribe(data => {
        this.bots = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            state: e.payload.doc.data()['state'],
            fightCount: e.payload.doc.data()['fightCount'],
            winCount: e.payload.doc.data()['winCount'],
            lossCount: e.payload.doc.data()['lossCount'],
            koCount: e.payload.doc.data()['koCount'],
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateWinner) {
          this.incrementWinCount(this.bots[0], -1, true);
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
            state: e.payload.doc.data()['state'],
            fightCount: e.payload.doc.data()['fightCount'],
            winCount: e.payload.doc.data()['winCount'],
            lossCount: e.payload.doc.data()['lossCount'],
            koCount: e.payload.doc.data()['koCount'],
            //timestamp: e.payload.doc.data()['timestamp']
          } as Robot;
        })
        if (updateLoser) {
          this.incrementLossCount(this.bots[0], -1);
          updateLoser = false;
        }
    });
  }

  incrementWinCount(robot: Robot, val: number, ko : boolean) {
    let newState = "";
    if (val === 1) {
      newState = "Repairing";
    } else if (val === -1){
      newState = "N/A";
    } else {
      console.log("Incorrect value provided for incrementLossCount.");
      return;
    }
    this.firestore.doc('robots/' + robot.id)
      .update({
        fightCount : robot.fightCount + 1,
        winCount : robot.winCount + 1,
        koCount : robot.koCount + +ko,
        state: 'Repairing'
        // Append a new array item to 'fights'
      })
      .then(function() {
          console.log("Winning robot successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating winning robot: ", error);
      });
  }

  incrementLossCount(robot: Robot, val: number) {
    let newState = "";
    if (val === 1) {
      newState = "Repairing";
    } else if (val === -1){
      newState = "N/A";
    } else {
      console.log("Incorrect value provided for incrementLossCount.");
      return;
    }
    this.firestore.doc('robots/' + robot.id)
      .update({
        fightCount : robot.fightCount + val,
        lossCount : robot.lossCount + val,
        state: newState
        // Append a new array item to 'fights'
      })
      .then(function() {
          console.log("Losing robot successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating losing robot: ", error);
      });
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }
}