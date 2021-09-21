import { Injectable, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../services/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public firebase: FirebaseApp,
    public afAuth: AngularFireAuth, // Inject Firestore auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

  }

  signUpUser(email: string, password: string) {
    this
      .afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // sends verification Email
        result.user?.sendEmailVerification();
        this.navigateToSignIn()

        
      }).catch((error) => {
        console.log('error: ', error);
      })
  }



  navigateToSignIn() {
    this.router.navigateByUrl('/sign-in');
 }

}
