import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../shared/chat.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  text: any;
  currentlocation: any;
  formatText: boolean;
  privateChatData: any | undefined;

  @ViewChild('inputText') inputText: any;

  constructor(
    private route: ActivatedRoute,
    public chatService: ChatService,
    public userService: UserService
  ) {
    this.formatText = false;
  }

  async ngOnInit() {
    this.currentlocation = await this.chatService.loadCurrentChatroom();

    await this.route.params.subscribe((params) => {
      this.chatService.loadCurrentChat(params.id, this.currentlocation);

      if (this.currentlocation == 'chats') {
        this.privateChatData = this.returnUserData(
          this.filterPrivateChatUser(params.id)[0].userUID
        );
      }
    });
  }

  filterPrivateChatUser(params: any) {
    let chatData = this.userService.user.privateChatUID.filter(
      (privateChatUID: any) => privateChatUID.chatID == params
    );

    return chatData;
  }

  sendMessage() {
    let date = new Date();
    let getTime = date.getHours() + ':' + date.getMinutes();

    this.inputText.nativeElement.value = '';
    this.chatService.chat.text.push({
      userID: this.userService.user.uid,
      time: getTime,
      message: this.text,
      answer: [],
      codeFormat: this.formatText,
    });

    this.chatService.updateCurrentChat(this.currentlocation);
  }

  changeText(value: any) {
    let replaceValue = value.replace(/^(.)|(.)$/g, '');

    if (value.includes('`' + replaceValue + '`') && replaceValue) {
      this.inputText.nativeElement.value = replaceValue;
      this.formatText = true;
      console.log(this.formatText);
    } else if (value.length <= 0) {
      this.formatText = false;
    }
  }

  returnUserData(userUID: any) {
    let getUser = this.userService.allUser.filter(
      (user: { uid: any }) => user.uid == userUID
    );

    return getUser[0];
  }
}
