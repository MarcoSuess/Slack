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

  signUpUser(email: string, password: string, name:string) {

  
    
    this
      .afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // sends verification Email
        result.user?.sendEmailVerification();
        this.navigateToSignIn();
        
        return result.user?.updateProfile({
          displayName: name
        })
          
      }).catch((error) => {
        console.log('error: ', error);
      })
  }



  signInUser(email:string , password: string) {
    console.log(this.afAuth);
    
    this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result.user);
      this.SetUserData(result.user)

      this.navigateToBoard();
    }).catch((error) => {
        console.log('error', error);
        
    })

  }


  navigateToBoard() {
    this.router.navigateByUrl('/channels');
 }



  navigateToSignIn() {
    this.router.navigateByUrl('/sign-in');
 }


 SetUserData(user: any) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const userData: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified
  }
  return userRef.set(userData, {
    merge: true
  })
}

}
