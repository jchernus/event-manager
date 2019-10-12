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

  getRobotDoc(robotId : string) {
    return this.firestore.doc('robots/' + robotId).valueChanges();
  }

  getRobotImage(imgID : number){
    const ref = this.storage.ref('botPhotos/' + imgID + '.jpg');
    return ref.getDownloadURL();
  }

  initializeBot(robotId : string){
    // Add all of the other fields to the documents & initialize
    // to something reasonable
    console.log("Initializing bot " + robotId);
    this.firestore.doc('robots/' + robotId)
      .update({
        weightClass : 250, // TODO: Remove
        alive: true,  // Still participating (or intending to) in the competition
        inAttendance : false, // Arrived & checked in
        passedSafety : false, // Passed safety
        state : "N/A", // Repairing, Ready to Fight, Scheduled, Dead
        fightCount : 0, 
        winCount : 0,
        lossCount : 0, 
        koCount : 0, // Number of fights won by KO (winCount - koCount = jdCount)
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
    // this.robots = this.firestore.collection('robots').
    console.log("Initializing bots...");

    this.firestore.collection('robots').snapshotChanges()
      .subscribe(data => {
        data.map(e => {
          return {
            id: e.payload.doc.id
          } as Robot;
        }).forEach(function(docRef) {
            console.log("Initializing bot with ID: " + docRef.id);
            this.initializeBot(docRef.id);
        });
    });

    const query = this.firestore.collection('robots');

    // query.snapshotChanges().map(changes => {
    //   changes.map(a => {
    //     const id = a.payload.doc.id; 
    //     this.firestore.collection('robots').doc(id).update({
    //       weightClass : 250, // TODO: Remove
    //       alive: true,  // Still participating (or intending to) in the competition
    //       inAttendance : false, // Arrived & checked in
    //       passedSafety : false, // Passed safety
    //       state : "N/A", // Repairing, Ready to Fight, Scheduled, Dead
    //       fightCount : 0, 
    //       winCount : 0,
    //       lossCount : 0, 
    //       koCount : 0, // Number of fights won by KO (winCount - koCount = jdCount)
    //       matches : {} // History of matches for the robot
    //     })
    //   })
    // }).subscribe();
  }

  addRobot(botName: String, weight: number){
    return this.firestore.collection('robots').add({
      name: botName,
      weightClass: weight
    })
    .then(function(docRef) {
      console.log("Robot added with ID: ", docRef.id);
      this.initializeBot(docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding robot: ", error);
    });
  }

  deleteRobot(robotId: string){
    this.firestore.doc('robots/' + robotId).delete();
  }

  markPresent(robotId: string, present: boolean){
    this.firestore.doc('robots/' + robotId).update({
      inAttendance: present,
      arrivalTime: firebase.firestore.Timestamp.fromDate(new Date())
    });
  }

  markSafety(robotId: string, safe: boolean){
    this.firestore.doc('robots/' + robotId).update({
      passedSafety: safe,
      safetyTime: firebase.firestore.Timestamp.fromDate(new Date())
    });
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }
}