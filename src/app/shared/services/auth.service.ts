import { Injectable, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  userName = new FormControl('', [Validators.required]);

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public firebase: FirebaseApp,
    public afAuth: AngularFireAuth, // Inject Firestore auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public chatService: ChatService,
    public userService: UserService,
    private _snackBar: MatSnackBar,
  ) {}

  /**
   * This function return a error message as string.
   *
   * @returns {string}
   */
  getErrorMessageName() {
    return 'You must enter a value';
  }

  /**
   * This function return a error message as string.
   *
   * @returns {string}
   */
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


   /**
   * This function return a error message as string.
   * 
   * @returns {string}
   */
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength') ? 'min 6 length required' : '';
  }


  /**
   * This function sign up the user.
   * 
   * @param {string} email 
   * @param {string} password 
   * @param {string} name 
   */
  signUpUser(email: string, password: string, name: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.loadScreen = true;
        result.user?.sendEmailVerification();
        this.setUserData(result.user, name);
        setTimeout(() => {
          this.loadScreen = false;
          this.navigateToSignIn();
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.openErrorMessage(error.message);
      });
  }




  /**
   * This function sign in the user.
   * 
   * @param {string} email 
   * @param {string} password 
   */
  signInUser(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.loadScreen = true;
        this.userOnline(result.user?.uid);
        this.currentUserID = result.user?.uid;
        setTimeout(() => {
          this.loadScreen = false;
          this.navigateToBoard();
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.openErrorMessage(error.message);
      });
  }


  /**
   * This function update the user to online.
   * 
   * @param {any} uid 
   */
  userOnline(uid: any) {
    var db = this.firebase.firestore();

    db.collection('users').doc(uid).update({ online: true });
  }

  /**
   * This function open the error message.
   * 
   * @param {string} message 
   */
  openErrorMessage(message: string) {
    this._snackBar.open(message);

    setTimeout(() => {
      this.closeErrorMessage();
    }, 1500);
  } 


  /**
   * This function close the error message.
   */
  closeErrorMessage() {
    this._snackBar.ngOnDestroy();
  }

  /**
   * This function navigate to the dashboard.
   */
  navigateToBoard() {
    this.router.navigateByUrl('/dashboard/' + this.currentUserID);
  }


  /**
   * This function navigate to the sign in.
   */
  navigateToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }


  /**
   * This function set the user data.
   *  
   * @param {any} user 
   * @param {string} name 
   * @returns  {any}
   */
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

  /**
   * This function set the guest user data.
   * 
   * @returns {any}
   */
  setGuestUserData() {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/guest`);
    const userData = {
      uid: 'guest',
      email: '',
      displayName: 'Guest',
      photoURL: 'assets/img/1.webp',
      emailVerified: '',
      online: false,
      status: '',
      privateChatUID: [],
    };

    this.currentUserID = 'guest';
    this.navigateToBoard();
    return userRef.set(userData, {
      merge: true,
    });
  }


  /**
   * This function sign out the user.
   */
  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then((result) => {
        console.log(result);
        this.router.navigateByUrl('/');
        this.userService.user.online = false;
        this.userService.saveUserData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}
