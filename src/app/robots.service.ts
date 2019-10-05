import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators/map';

declare var require: any;

@Injectable()
export class RobotsService {
  robots;

  constructor(private firestore: AngularFirestore) { 
  }

  getRobotsObservable(weightClass:number) {
    this.robots = this.firestore.collection('robots', ref => ref.where('weightClass', "==", weightClass)).snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));

    return this.robots;
  }

  getRobotDoc(robotId : string) {
    return this.firestore.doc('robots/' + robotId).valueChanges();
  }
  
  importBots(){
    console.log("Importing bots n' shit");
    // const rp = require('request-promise');
    // const $ = require('cheerio');
    // const path = 'http://www.buildersdb.com/view_bots.asp?eventid=' + 580 + '&sort=&classid=' + 7;

    // rp(path)
    //   .then(function(html){
    //     //success!
    //     var numBots = $('td > font > b', html).length;
    //     var botInfo = [];
    //     var botName;
    //     var botImgURL;
    //     $('table > tbody > tr > td > font > b', html).each(function(i, elem){
    //         botName=$(this).text();
    //         botImgURL=$(this).parent().prev().prev().attr('src');
    //         botInfo[botName] = [botImgURL];
    //     });
    //     console.log(botInfo);
    //   })
    //   .catch(function(err){
    //     //handle error
    //   });
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
        //timestamp: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815"))
        //timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
    //this.robots = this.firestore.collection('robots').

  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
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

  // addWin(robotId: String) {
  //   this.firestore.doc('robots/' + robotId)
  //     .update({
  //       //increment winCount intelligently
  //   }
  // }

  deleteRobot(robotId: string){
      this.firestore.doc('robots/' + robotId).delete();
  }
}