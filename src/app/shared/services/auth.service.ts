import { Injectable, NgZone } from '@angular/core';
import { async } from '@angular/core/testing';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserID: any;
  loadScreen: boolean = false;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public firebase: FirebaseApp,
    public afAuth: AngularFireAuth, // Inject Firestore auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public chatService: ChatService,
    public userService: UserService
  ) {}

  signUpUser(email: string, password: string, name: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // sends verification Email
        result.user?.sendEmailVerification();
        this.setUserData(result.user, name);
        this.navigateToSignIn();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  signInUser(email: string, password: string) {
    console.log(this.afAuth);

    this.loadScreen = true;

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

  setUserData(user: any, name: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: 'assets/img/1.webp',
      emailVerified: user.emailVerified,
      online: false,
      status: '',
      privateChatUID: [],
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
