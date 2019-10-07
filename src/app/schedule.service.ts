import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ScheduleService {
  schedule;

  constructor(private firestore: AngularFirestore) { }

  getSchedule(){
    return this.firestore.collection('fightSchedule').snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  addMatch(redBot: string, blueBot: string){
    // Update the fights collection
    this.firestore.collection('fightSchedule').add({
      redSquare: redBot,
      blueSquare: blueBot,
      //timestamp
    });
  }

  deleteMatch(id: string){

  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

}