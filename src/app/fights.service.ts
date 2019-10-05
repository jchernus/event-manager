import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Fight } from './fight';

import { map } from 'rxjs/operators/map';

@Injectable()
export class FightsService {
  fights = [];

  constructor(private firestore: AngularFirestore) { 

    //Q: Why wouldn't I populate fights here, and then 
    //just point to fights instead of calling getFights()
    //from each component?
  }

  getFights(){
    return this.firestore.collection('fightHistory').snapshotChanges();
  }

  addFight(fight: Fight){

    // TEMP STUFF
    let robotName = "Button Lee";
    // END OF Temp Stuff

    let incrementKo;

    // Update the fights collection
    this.firestore.collection('fightHistory').add(fight);

    if (fight.ko) { 
      incrementKo = 1;
    }
    var robot;

    // Update the winning robot's doc
    this.firestore.collection('robots', ref => ref.where('name', '==', robotName))
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            robot = doc.data();
            robot.id = doc.id;
            console.log("Bot " + robotName + "has ID: " + robot.id);
        });
    })
    .catch(function(error) {
        console.log("Error getting document: ", error);
    });
    
    this.firestore.doc('robots/' + robot.id)
      .update({
        fightCount : robot.fightCount +1,
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

    // Update the losing robot's doc
    this.firestore.doc('robots/' + robot.id)
      .update({
        fightCount : robot.fightCount +1,
        lossCount : robot.winCount + 1,
        // Append a new array item to 'fights'
      })
      .then(function() {
          console.log("Losing robot successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating losing robot: ", error);
      });

    return 1;
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