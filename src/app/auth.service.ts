import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import * as firebase from 'firebase/app';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

      //// Get auth data, then get firestore user document || null

      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
  }   

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  signOut() {
    this.afAuth.auth.signOut() //.then(() => {
    //     this.router.navigate(['/']);
    // });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "Viewer"
    }
    return userRef.set(data, { merge: true })
  }


  isViewer(user: User): boolean {
    const allowed = ['Admin', 'Moderator', 'Viewer'];
    return this.checkAuthorization(user, allowed);
  }

  isModerator(user: User): boolean {
    const allowed = ['Admin', 'Moderator'];
    return this.checkAuthorization(user, allowed);
  }

  isAdmin(user: User): boolean {
    const allowed = ['Admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.role == role ) {
        return true
      }
    }
    return false
  }

}