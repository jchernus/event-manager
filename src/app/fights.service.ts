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

    //Q: Why wouldn't I populate fights here, and then 
    //just point to fights instead of calling getFights()
    //from each component?
  }

  getFights(){
    return this.firestore.collection('fightHistory').snapshotChanges();
  }

  addFight(){

    // TEMP STUFF
    let winningRobotName = "Button Lee";
    let losingRobotName = "Kingcatter";
    // END OF Temp Stuff


    // Update the fights collection
    //this.firestore.collection('fightHistory').add(fight);

    let incrementKo = 0;
    if (true) {   // TODO: Fix
      incrementKo = 1;
    }

    // Update the winning robot's doc
    this.firestore.collection('robots', ref => ref.where('name', '==', winningRobotName)).snapshotChanges()
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

        let robot = this.bots[0];

        this.firestore.doc('robots/' + robot.id)
        .update({
          fightCount : robot.fightCount + 1,
          winCount : robot.winCount + 1,
          koCount : robot.koCount + incrementKo,
          // Append a new array item to 'fights'
        })
        .then(function() {
            console.log("Winning robot successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating winning robot: ", error);
        });
    });

    // // Update the losing robot's doc
    // this.firestore.doc('robots/' + robot.id)
    //   .update({
    //     fightCount : robot.fightCount +1,
    //     lossCount : robot.lossCount + 1,
    //     // Append a new array item to 'fights'
    //   })
    //   .then(function() {
    //       console.log("Losing robot successfully updated!");
    //   })
    //   .catch(function(error) {
    //       console.error("Error updating losing robot: ", error);
    //   });
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