import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Robot } from './robot';

import * as cheerio from 'cheerio';

//const rp = require('request-promise');
//const $ = require('cheerio');

@Injectable()
export class RobotsService {

  constructor(private firestore: AngularFirestore) { 
  }

  getRobotsObservable() {
    return this.firestore.collection('robots').snapshotChanges();
  }

  getRobotDoc(robotId : string) {
    return this.firestore.collection('robots').doc(robotId);
  }

  // addRobot(robot: Robot){
  //   return this.firestore.collection('robots').add(robot);
  // }

  // deleteRobot(robotId: string){
  //     this.firestore.doc('robots/' + robotId).delete();
  // }
}