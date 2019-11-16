import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators/map';

import { User } from './user';

@Injectable()
export class UsersService {
  users;

  constructor(private firestore: AngularFirestore) { }

  getAllUsersObservable() {
    this.users = this.firestore.collection('users', ref => ref.orderBy('displayName', 'asc')).snapshotChanges()
    .pipe(map(actions => actions.map(this.documentToDomainObject)));

    return this.users;
  }

  changeRole(userId: string, newRole: string) {
    var db = firebase.firestore();
    db.collection("users").doc(userId)
      .update({
        role: newRole
      })
      .then(function() {
          console.log("User's role was updated successfully.");
      })
      .catch(function(error) {
          console.error("Error updating user's role: ", error);
      })
  }

  deleteUser(userId: string){
    this.firestore.doc('users/' + userId).delete();
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

}