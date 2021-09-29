import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public userService: UserService, public afs: AngularFirestore) {}

  createNewChat(chatUID: any) {
    const chatRef: AngularFirestoreDocument<any> = this.afs.doc(
      `chats/${chatUID}`
    );
    const chatData = {
      chat: [],
    };
    return chatRef.set(chatData, {
      merge: true,
    });
  }
}
