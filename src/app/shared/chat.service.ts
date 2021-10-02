import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Chat } from './services/chat';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat: Chat | any;
  currentChatID: string | undefined;

  constructor(
    public userService: UserService,
    public afs: AngularFirestore,
    private firestore: AngularFirestore
  ) {}

  createNewChat(chatUID: any) {
    const chatRef: AngularFirestoreDocument<any> = this.afs.doc(
      `chats/${chatUID}`
    );
    const chatData = {
      text: [],
    };
    return chatRef.set(chatData, {
      merge: true,
    });
  }

  loadCurrentChat(paramsID: any) {
    this.currentChatID = paramsID;
    this.chat = new Chat();
    this.firestore
      .collection('chats')
      .doc(paramsID)
      .valueChanges()
      .subscribe((chat: any) => {
        this.chat.text = chat.text;
      });
  }

  updateCurrentChat() {
    this.firestore
      .collection('chats')
      .doc(this.currentChatID)
      .update(this.chat.toJson());
  }
}
