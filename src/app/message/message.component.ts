import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogChatImageComponent } from '../dialog-chat-image/dialog-chat-image.component';
import { ChatService } from '../shared/chat.service';
import { CloudstorageService } from '../shared/services/cloudstorage.service';
import { UserService } from '../shared/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  text: any = '';
  currentlocation: any;
  formatText: boolean;
  privateChatData: any;
  chatID: any;
  hoverIndexThreadIcon: number = -1;
  hoverIndexChatImageIcon: number = -1;
  threadIndex: number | undefined;

  @ViewChildren('messages')
  messages!: QueryList<any>;
  @ViewChild('inputText') inputText: any;
  @ViewChild('scrollEnd')
  private myScrollContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public chatService: ChatService,
    public userService: UserService,
    public cloudstorageService: CloudstorageService,
    public dialog: MatDialog,
    public router: Router,
    private location: Location
  ) {
    this.formatText = false;
  }

  onHoverThread(i: number) {
    this.hoverIndexThreadIcon = i;
  }

  onHoverChatImage(i: number) {
    this.hoverIndexChatImageIcon = i;
  }

  scrollToBottom = () => {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  };

  ngOnInit() {
    console.log(this.isThreadRoute());

    this.currentlocation = this.chatService.loadCurrentChatroom();

    this.route.params.subscribe((params) => {
      this.chatID = params.id;
      this.chatService.loadCurrentChat(params.id, this.currentlocation);

      if (this.currentlocation == 'chats' && this.userService.user) {
        this.privateChatData = this.returnUserData(
          this.filterPrivateChatUser(params.id)[0].userUID
        );
      }
      this.scrollToBottom();
    });

    console.log(this.privateChatData);
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  filterPrivateChatUser(params: any) {
    let chatData = this.userService.user.privateChatUID.filter(
      (privateChatUID: any) => privateChatUID.chatID == params
    );

    return chatData;
  }

  sendMessage() {
    if (
      (this.text && this.cloudstorageService.imageURL.length <= 0) ||
      this.checkUploadAllImages()
    ) {
      let date = new Date();
      let getTime = date.getHours() + ':' + date.getMinutes();

      if (this.isThreadRoute() && this.threadIndex) {
        this.chatService.chat.text[this.threadIndex].answer.push({
          userID: this.userService.user.uid,
          time: getTime,
          message: this.text,
          images: this.cloudstorageService.chatImages,
          codeFormat: this.formatText,
        });
      } else {
        this.chatService.chat.text.push({
          userID: this.userService.user.uid,
          time: getTime,
          message: this.text,
          images: this.cloudstorageService.chatImages,
          answer: [],
          codeFormat: this.formatText,
        });
      }

      this.inputText.nativeElement.value = '';
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

  openImageDialog(img: any) {
    this.dialog.open(DialogChatImageComponent, {
      data: {
        name: img.name,
        src: img.src,
      },
    });
  }

  isThreadRoute() {
    return this.router.url.includes('/thread');
  }

  navigateToThread(index: number) {
    let loction = this.currentlocation == 'channels' ? 'channel' : 'chat';

    this.router.navigateByUrl(
      '/dashboard/' +
        this.userService.user.uid +
        '/' +
        loction +
        '/' +
        this.chatID +
        '/thread/' +
        index
    );
  }

  goBack() {
    this.location.back();
  }
}
