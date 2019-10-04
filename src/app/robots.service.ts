import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators/map';

declare var require: any;

@Injectable()
export class RobotsService {
  robots;

  constructor(private firestore: AngularFirestore) { 
  }

  getRobotsObservable() {
    this.robots = this.firestore.collection('robots').snapshotChanges()
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
    this.firestore.doc('robots/' + robotId)
      .update({
        inAttendance : false,
        passedSafety : false,
        state : "N/A"
      });
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

  addRobot(){
    return this.firestore.collection('robots').add({

    });
  }

  deleteRobot(robotId: string){
      this.firestore.doc('robots/' + robotId).delete();
  }
}