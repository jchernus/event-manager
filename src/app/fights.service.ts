import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Fight } from './fight';

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
    return this.firestore.collection('fightHistory').add(fight);
  }

  deleteFight(fightId: string){
      this.firestore.doc('fightHistory/' + fightId).delete();
  }
}