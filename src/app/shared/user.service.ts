import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import { User } from './services/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | any;
  allUser: any = [];

  constructor(private firestore: AngularFirestore) {}

  loadCurrentUserData(paramsID: any) {
    this.user = new User();
    this.firestore
      .collection('users')
      .doc(paramsID)
      .valueChanges()
      .subscribe((currentUser: any) => {
        console.log(currentUser, 'FROM FIRESTORE');
        this.user.uid = currentUser.uid;
        this.user.email = currentUser.email;
        this.user.displayName = currentUser.displayName;
        this.user.photoURL = currentUser.photoURL;
        this.user.emailVerified = currentUser.emailVerified;
        this.user.online = true;
        this.user.status = currentUser.status;
      });
  }


  loadAllUserData() {
    this
    .firestore
    .collection('users')
    .valueChanges()
    .subscribe((user) => {
      console.log(user);
      
      this.allUser = user;
    })
  }


  saveUserData() {
    console.log(this.user);

    this.firestore
      .collection('users')
      .doc(this.user.uid)
      .update(this.user.toJson());
  }
}
