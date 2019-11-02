import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators/map';

import { Robot } from './robot';

declare var require: any;

@Injectable()
export class RobotsService {
  robots;
  bots = [];

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { 
  }

  getRobotsObservable(weightClass:number) {
    this.robots = this.firestore.collection('robots', ref => ref.where('weightClass', "==", weightClass).orderBy('name', 'asc')).snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));

    return this.robots;
  }

  getRobotsObservableByStandings(weightClass:number) {
    this.robots = this.firestore.collection('robots', ref => ref.where('weightClass', "==", weightClass).orderBy('fightCount', 'desc').orderBy('winCount', 'desc').orderBy('koCount', 'desc')).snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));

    return this.robots;
  }

  getRobotDocData(robotId : string) {
    return this.firestore.doc('robots/' + robotId).valueChanges();
  }

  getRobotImage(imgID : number){
    const ref = this.storage.ref('botPhotos/' + imgID + '.jpg');
    return ref.getDownloadURL();
  }

  initializeBot(robotId : string, weightClass: number){
    // Add all of the other fields to the documents & initialize
    // to something reasonable
    console.log("Initializing bot " + robotId);
    this.firestore.doc('robots/' + robotId)
      .update({
        weightClass : weightClass,
        alive: true,  // Still participating (or intending to) in the competition
        inAttendance : false, // Arrived & checked in
        passedSafety : false, // Passed safety
        state : "N/A", // Repairing, Ready to Fight, Scheduled, Dead
        fightCount : 0, 
        winCount : 0,
        lossCount : 0, 
        koCount : 0, // Number of fights won by KO (winCount - koCount = jdCount)
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        lastFought: firebase.firestore.FieldValue.delete(),
        matches : {} // History of matches for the robot
      })
      .then(function() {
          console.log("Robot successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating robot: ", error);
      });
  }

  initializeAllBots(){
    // Initialize all existing robots to starting config
    console.log("Initializing bots...");
    
    var db = firebase.firestore();

    db.collection("robots").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
  }

  addRobot(botName: String, weight: number){
    return this.firestore.collection('robots').add({
      name: botName,
      weightClass: weight
    })
    .then(function(docRef) {
      console.log("Robot added with ID: ", docRef.id);
      this.initializeBot(docRef.id, weight);
    })
    .catch(function(error) {
      console.error("Error adding robot: ", error);
    });
  }

  deleteRobot(robotId: string){
    this.firestore.doc('robots/' + robotId).delete();
  }

  markPresent(robotId: string, present: boolean){
    if (present) {
      this.firestore.doc('robots/' + robotId).update({
        inAttendance: present,
        arrivalTime: firebase.firestore.Timestamp.fromDate(new Date())
      });
    } else {
      this.firestore.doc('robots/' + robotId).update({
        inAttendance: present,
        arrivalTime: firebase.firestore.FieldValue.delete()
      });
    }
  }

  markSafety(robotId: string, safe: boolean){
    if (safe) {
      this.firestore.doc('robots/' + robotId).update({
        passedSafety: safe,
        safetyTime: firebase.firestore.Timestamp.fromDate(new Date())
      });
    } else {
      this.firestore.doc('robots/' + robotId).update({
        passedSafety: safe,
        safetyTime: firebase.firestore.FieldValue.delete()
      });
    }
  }

  changeState(robotId: string, newState: string) {
    var db = firebase.firestore();
    db.collection("robots").doc(robotId)
      .update({
        state: newState
      })
      .then(function() {
          console.log("Robot's state was updated successfully.");
      })
      .catch(function(error) {
          console.error("Error updating robot state: ", error);
      })
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }
}