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

  getCurrentFight(arena: string){
    return this.firestore.doc('currentlyFighting/' + ""+arena).valueChanges();
  }

  getScheduleByWeight(weightClass: number){
    return this.firestore.collection('fightSchedule', ref => ref.where('weightClass', "==", weightClass).orderBy('timestamp', 'asc')).snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  getScheduleByArena(arena: string){
    return this.firestore.collection('fightSchedule', ref => ref.where('arena', "==", arena).orderBy('timestamp', 'asc')).snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  // MATCHES
  addMatch(arena: string, redBot: string, blueBot: string){
    var db = firebase.firestore();
    let weightClass : number;

    // Extract weight class from the robot record
    db.collection("robots").where("name", "==", redBot)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          weightClass = doc.data()['weightClass'];

          // Update the fightSchedule collection
          db.collection('fightSchedule').add({
            redSquare: redBot,
            blueSquare: blueBot,
            arena: arena,
            weightClass: weightClass,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
          });
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    // Update the fightSchedule collection
    // this.firestore.collection('fightSchedule').add({
    //   redSquare: redBot,
    //   blueSquare: blueBot,
    //   arena: arena,
    //   timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    // });

    // Update the robot's states to "Scheduled"
    db.collection("robots").where('name', '==', redBot)
      .get()
      .then((snapshots) => {
        snapshots.forEach((robot) => 
          robot.ref.update({
            state: "Scheduled"
          })
          .then(function() {
              console.log("Robot successfully updated with new schedule!");
          })
          .catch(function(error) {
              console.error("Error updating schedule of robot: ", error);
          })
        )
      })

    // Update the robot's states to "Scheduled"
    db.collection("robots").where('name', '==', blueBot)
      .get()
      .then((snapshots) => {
        snapshots.forEach((robot) => 
          robot.ref.update({
            state: "Scheduled"
          })
          .then(function() {
              console.log("Robot successfully updated with new schedule!");
          })
          .catch(function(error) {
              console.error("Error updating schedule of robot: ", error);
          })
        )
      })
  }

  deleteMatch(redBot: string, blueBot: string, matchId: string){
    var db = firebase.firestore();
    // Change robot statuses to 'ready' instead of 'scheduled'
    db.collection("robots").where('name', '==', redBot)
      .get()
      .then((snapshots) => {
        snapshots.forEach((robot) => 
          robot.ref.update({
            state: "N/A" // Should this be "N/A" or "Ready"?
          })
          .then(function() {
              console.log("Robot successfully updated with new schedule!");
          })
          .catch(function(error) {
              console.error("Error updating schedule of robot: ", error);
          })
        )
      })

    db.collection("robots").where('name', '==', blueBot)
      .get()
      .then((snapshots) => {
        snapshots.forEach((robot) => 
          robot.ref.update({
            state: "N/A" // Should this be "N/A" or "Ready"?
          })
          .then(function() {
              console.log("Robot successfully updated with new schedule!");
          })
          .catch(function(error) {
              console.error("Error updating schedule of robot: ", error);
          })
        )
      })

    // Delete match from fightSchedule
    this.firestore.doc('fightSchedule/' + matchId).delete();
  }

  // BREAKS
  addBreak(arena: string, breakDuration: number){
    // Update the fightSchedule collection
    this.firestore.collection('fightSchedule').add({
      arena: arena,
      breakDuration: breakDuration,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    });
  }

  deleteBreak(matchId: number){
    // Delete match from fightSchedule
    this.firestore.doc('fightSchedule/' + matchId).delete();
  }

  // SCHEDULING
  moveMatch(match1ID: string, match1Timestamp: any, match2ID: string, match2Timestamp: any){
    var db = firebase.firestore();
    console.log(match1ID, match2ID, match1Timestamp, match2Timestamp);

    db.collection("fightSchedule").doc(match1ID)
      .update({
        timestamp: match2Timestamp
      })
      .then(function() {
          console.log("Match successfully moved!");
      })
      .catch(function(error) {
          console.error("Error updating match order: ", error);
      })

    db.collection("fightSchedule").doc(match2ID)
      .update({
        timestamp: match1Timestamp
      })
      .then(function() {
          console.log("Match successfully moved!");
      })
      .catch(function(error) {
          console.error("Error updating match order: ", error);
      })
  }

  promoteToCurrentMatch(arena: string, redBot: string, blueBot: string, matchId: string){
    let myVar = this.firestore.doc('currentlyFighting/' + arena).get();

    var db = firebase.firestore();
    const usersRef = db.collection('currentlyFighting').doc(""+arena)

    usersRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            console.log("No can do, clear the first one out.");
          });
        } else {
          usersRef.set({
            redSquare: redBot,
            blueSquare: blueBot,
            active: true
          }).then(function() {
            console.log("Current match successfully updated!");
            db.collection('fightSchedule').doc(matchId).delete();
          });
        }
    });
  }

  clearCurrentMatch(arena: string){
    this.firestore.doc('currentlyFighting/' + arena).delete();
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

}