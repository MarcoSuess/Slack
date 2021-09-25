import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from "firebase/auth";
import { User } from './services/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user: User | any;

  constructor(  private firestore: AngularFirestore,) { }

  loadUserData(paramsID : any) {
      this.user = new User();
      
    this.firestore
    .collection('users')
    .doc(paramsID)
    .valueChanges()
    .subscribe((currentUser: any) => {
      console.log(currentUser, 'FROM FIRESTORE');
      
      this.user.displayName = currentUser.displayName;
      this.user.online = true;
      
    })

  }
  





}
