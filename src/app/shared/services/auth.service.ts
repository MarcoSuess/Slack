import { Injectable, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserID: any; 

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public firebase: FirebaseApp,
    public afAuth: AngularFireAuth, // Inject Firestore auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {}






  signUpUser(email: string, password: string, name: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // sends verification Email
        result.user?.sendEmailVerification();
        this.setUserData(result.user);
        this.navigateToSignIn();

        return result.user?.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  signInUser(email: string, password: string) {
    console.log(this.afAuth);

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        this.currentUserID = result.user?.uid;
        this.navigateToBoard();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  navigateToBoard() {
    this.router.navigateByUrl('/dashboard/' + this.currentUserID);
  }

  navigateToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      online: false
    };
    return userRef.set(userData, {
      merge: true,
    });

    
  }

  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}
