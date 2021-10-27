import { ThisReceiver } from '@angular/compiler';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../shared/chat.service';
import { CloudstorageService } from '../shared/services/cloudstorage.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, AfterViewChecked {
  text: any = '';
  currentlocation: any;
  formatText: boolean;
  privateChatData: any;
  showDeleteBTN: boolean = false;

  @ViewChild('inputText') inputText: any;
  @ViewChild('scrollEnd')
  private myScrollContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public chatService: ChatService,
    public userService: UserService,
    public cloudstorageService: CloudstorageService
  ) {
    this.formatText = false;
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  async ngOnInit() {
    this.currentlocation = this.chatService.loadCurrentChatroom();

    this.route.params.subscribe((params) => {
      this.chatService.loadCurrentChat(params.id, this.currentlocation);

      if (this.currentlocation == 'chats' && this.userService.user) {
        console.log('getUserData');

        this.privateChatData = this.returnUserData(
          this.filterPrivateChatUser(params.id)[0].userUID
        );
      }
    });

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  filterPrivateChatUser(params: any) {
    let chatData = this.userService.user.privateChatUID.filter(
      (privateChatUID: any) => privateChatUID.chatID == params
    );

    return chatData;
  }

  sendMessage() {
    if (this.text && this.cloudstorageService.imageURL.length <= 0 || this.checkUploadAllImages()) {
      let date = new Date();
      let getTime = date.getHours() + ':' + date.getMinutes();

      this.inputText.nativeElement.value = '';
      this.chatService.chat.text.push({
        userID: this.userService.user.uid,
        time: getTime,
        message: this.text,
        images: this.cloudstorageService.chatImages,
        answer: [],
        codeFormat: this.formatText,
      });
      this.text = '';
      this.cloudstorageService.chatImages = [];
      this.cloudstorageService.imageURL = [];
      this.chatService.updateCurrentChat(this.currentlocation);
    }
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

  checkUploadAllImages() {
    for (var index in this.cloudstorageService.imageURL)
      if (this.cloudstorageService.imageURL[index].uploaded) return true;

    return false;
  }
}
