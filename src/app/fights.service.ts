import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators/map';
import * as firebase from 'firebase/app';

import { Fight } from './fight';
import { Robot } from './robot';


@Injectable()
export class FightsService {
  fights = [];
  bots = [];

  constructor(private firestore: AngularFirestore) { }

  getFightsObservable(weightClass: number){
    return this.firestore.collection('fightHistory', ref => ref.where('weightClass', "==", weightClass).orderBy('timestamp')).snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  addFight(fight : Fight){
    var db = firebase.firestore();

    // Update the fights collection
    this.firestore.collection('fightHistory').add(fight);

    // Update the winning robot's doc
    db.collection("robots").where('name', '==', fight.winner)
      .get()
      .then((snapshots) => {
        snapshots.forEach((robot) => 
          robot.ref.update({
            fightCount : robot.data().fightCount + 1,
            winCount : robot.data().winCount + 1,
            koCount : robot.data().koCount + +fight.ko,
            state: "Repairing",
            lastFought: firebase.firestore.Timestamp.fromDate(new Date())
          })
          .then(function() {
              console.log("Winning robot successfully updated! KO: " + fight.ko);
          })
          .catch(function(error) {
              console.error("Error updating winning robot: ", error);
          })
        )
      })

    // Update the losing robot's doc
    db.collection("robots").where('name', '==', fight.loser)
      .get()
      .then((snapshots) => {
        snapshots.forEach((robot) => 
          robot.ref.update({
            fightCount : robot.data().fightCount + 1,
            lossCount : robot.data().lossCount + 1,
            state: "Repairing",
            lastFought: firebase.firestore.Timestamp.fromDate(new Date())
          })
          .then(function() {
              console.log("Losing robot successfully updated!");
          })
          .catch(function(error) {
              console.error("Error updating losing robot: ", error);
          })
        )
      })
  }

  deleteFight(fight: Fight){
    var db = firebase.firestore();

    // Delete the fight from fightHistory
    this.firestore.doc('fightHistory/' + fight.id).delete();

      // Update the winning robot's doc
      db.collection("robots").where('name', '==', fight.winner)
        .get()
        .then((snapshots) => {
          snapshots.forEach((robot) => 
            robot.ref.update({
              fightCount : robot.data().fightCount - 1,
              winCount : robot.data().winCount - 1,
              koCount : robot.data().koCount - +fight.ko,
              state: "N/A",
              lastFought: firebase.firestore.FieldValue.delete()
            })
            .then(function() {
                console.log("Winning robot successfully updated! KO: " + fight.ko);
            })
            .catch(function(error) {
                console.error("Error updating winning robot: ", error);
            })
          )
        })

      // Update the losing robot's doc
      db.collection("robots").where('name', '==', fight.loser)
        .get()
        .then((snapshots) => {
          snapshots.forEach((robot) => 
            robot.ref.update({
              fightCount : robot.data().fightCount - 1,
              lossCount : robot.data().lossCount - 1,
              state: "N/A",
              lastFought: firebase.firestore.FieldValue.delete()
            })
            .then(function() {
                console.log("Losing robot successfully updated!");
            })
            .catch(function(error) {
                console.error("Error updating losing robot: ", error);
            })
          )
        })
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }
}