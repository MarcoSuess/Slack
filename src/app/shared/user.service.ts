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
  loadCurrentUser: boolean = false;

  constructor(private firestore: AngularFirestore) {}


/**
 * This function load the current User data.
 * 
 * @param {any} paramsID 
 */
  loadCurrentUserData(paramsID: any) {
    this.user = new User();
    this.firestore
      .collection('users')
      .doc(paramsID)
      .valueChanges()
      .subscribe((currentUser: any) => {
        this.user.uid = currentUser.uid;
        this.user.email = currentUser.email;
        this.user.displayName = currentUser.displayName;
        this.user.photoURL = currentUser.photoURL;
        this.user.emailVerified = currentUser.emailVerified;
        this.user.online = true;
        this.user.status = currentUser.status;
        this.user.privateChatUID = currentUser.privateChatUID;

        this.loadCurrentUser = true;
      });
  }


  /**
   * This function load all user data.
   */
  loadAllUserData() {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((user) => {
        this.allUser = user;
        console.log(user);
      });
  }



  /**
   * This function save the User data.
   */
  saveUserData() {
    console.log(this.user);

    this.firestore
      .collection('users')
      .doc(this.user.uid)
      .update(this.user.toJson());
  }
  

  /**
   * This function save the other user data.
   * 
   * @param {any} user 
   */
  saveOtherUserData(user: any) {
    this.firestore
      .collection('users')
      .doc(user.uid)
      .update(this.OtherUserToJson(user));
  }


  /**
   * This function return the user data to json.
   * 
   * @param {any} user
   * @returns {json}
   */
  OtherUserToJson(user: any) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      online: user.online,
      status: user.status,
      privateChatUID: user.privateChatUID,
    };
  }
}
