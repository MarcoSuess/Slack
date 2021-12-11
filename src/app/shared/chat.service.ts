import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { Chat } from './services/chat';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat: Chat | any;
  currentChatID: string | undefined;
  allChannels: any;
  loadChat : boolean = false;

  constructor(
    public userService: UserService,
    public afs: AngularFirestore,
    private firestore: AngularFirestore
  ) {}  


  /**
   * This function create a new Chat. 
   * 
   * @param {string} chatUID 
   * @returns {any}
   */
  createNewChat(chatUID: string) {
    const chatRef: AngularFirestoreDocument<any> = this.afs.doc(
      `chats/${chatUID}`
    );
    const chatData = {
      name: 'privateChat',
      text: [],
    };
    return chatRef.set(chatData, {
      merge: true,
    });
  }


  /**
   * This function create a new channel.
   * 
   * @param {string} channelName 
   * @returns  {any}
   */
  createNewChannel(channelName: string) {
    const newID = this.afs.createId();

    const channelRef: AngularFirestoreDocument<any> = this.afs.doc(
      `channels/${newID}`
    );
    const channelData = {
      name: channelName,
      ID: newID,
      text: [],
    };
    return channelRef.set(channelData, {
      merge: true,
    });
  } 


  /**
   * This function load the current chat.
   * 
   * @param {string} paramsID 
   * @param {string} location 
   */
  loadCurrentChat(paramsID: string, location: string) {
    this.currentChatID = paramsID;
    this.chat = new Chat();
    this.firestore
      .collection(location)
      .doc(paramsID)
      .valueChanges()
      .subscribe((chat: any) => {
        console.log(chat);
        this.chat.name = chat.name;
        this.chat.text = chat.text;
        
        this.loadChat = true;
      });
  }


  /**
   * This function update the current chat.
   * 
   * @param {string} location 
   */
  updateCurrentChat(location: string) {
    this.firestore
      .collection(location)
      .doc(this.currentChatID)
      .update(this.chat.toJson());
  }


  /**
   * This function subscribe  all channels.
   */
  loadAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channel) => {
        this.allChannels = channel;
      });
  }


  /**
   * This function save the current chat room in a local storage.
   * 
   * @param {string} location 
   */
  saveCurrentChatroom(location: string) {
    localStorage.setItem('chatRoom', location);
  }


  /**
   * This function load the current chatroom from the local storage.
   * 
   * @returns {string}
   */
  loadCurrentChatroom() {
    let location = localStorage.getItem('chatRoom');
    return location;
  }


  /**
   * This function clear the local storage.
   */
  deleteCurrentChatroom() {
    localStorage.clear();
  }
}
