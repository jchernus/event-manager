import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Robot } from './robot';

@Injectable()
export class RobotsService {
  robots = [];

  constructor(private firestore: AngularFirestore) { 
    this.loadRobots();
  }

  getRobot(robotID: number){
    // TODO: Fix this, doesn't work
    return this.robots[robotID]['name'];
  }

  getRobots(){
    return this.robots;
  }

  loadRobots(){
    this.robots = this.firestore.collection('robots').snapshotChanges();
  }

  addRobot(robot: Robot){
    return this.firestore.collection('robots').add(robot);
  }

  deleteRobot(robotId: string){
      this.firestore.doc('robots/' + robotId).delete();
  }

  importRobots(eventID: number, classID: number){
    const url = 'http://www.buildersdb.com/view_bots.asp?eventid=' + eventID + '&sort=&classid=' + classID;
    return null;
  }

  // const EVENTID = 580;

  // const BOTS15 = 142;
  // const BOTS30 = 123;
  // const BOTSHW = 7;

  // Images can be at botpics/thumbs/13516.jpg
  // or at botpics/13516.jpg

  /*
  const rp = require('request-promise');
  const $ = require('cheerio');
  const url = 'http://www.buildersdb.com/view_bots.asp?eventid=580&sort=&classid=7';

  rp(url)
    .then(function(html){
      //success!
      var numBots = $('td > font > b', html).length;
      var botInfo = [];
      var botName;
      var botImgURL;
      $('table > tbody > tr > td > font > b', html).each(function(i, elem){
          botName=$(this).text();
          botImgURL=$(this).parent().prev().prev().attr('src');
          botInfo[botName] = [botImgURL];
      });
      console.log(botInfo);
    })
    .catch(function(err){
      //handle error
    });
    */
}