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
  @ViewChild('inputText') inputText: any;

  constructor(
    private route: ActivatedRoute,
    public chatService: ChatService,
    public userService: UserService
  ) {}

  async ngOnInit() {
    let location = await this.chatService.loadCurrentChatroom();
  
    await this.route.params.subscribe((params) => {
      this.chatService.loadCurrentChat(params.id, location);
    });
  }

  sendMessage() {
    let date = new Date();
    let getTime = date.getHours() + ':' + date.getMinutes();

    console.log(this.text);
    this.inputText.nativeElement.value = '';
    this.chatService.chat.text.push({
      name: this.userService.user.displayName,
      time: getTime,
      image: this.userService.user.photoURL,
      message: this.text,
      answer: [],
    });

    this.chatService.updateCurrentChat();
  }
}
