import { Injectable, NgZone } from '@angular/core';
import { async } from '@angular/core/testing';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public firebase: FirebaseApp,
    public afAuth: AngularFireAuth, // Inject Firestore auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public chatService: ChatService,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength') ? 'min 6 length required' : '';
  }

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
        console.log(error);

        console.log('errorMessage', error.message);
        console.log('errorCode', error.code);
        this.openErrorMessage(error.message);
      });
  }

  signInUser(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.loadScreen = true;
        this.currentUserID = result.user?.uid;
        this.navigateToBoard();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.openErrorMessage(error.message);
      });
  }

  openErrorMessage(message: any) {
    this._snackBar.open(message);
  }

  closeErrorMessage() {
    this._snackBar.ngOnDestroy();
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
        this.router.navigateByUrl('/');
        this.userService.user.online = false
        this.userService.saveUserData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}
