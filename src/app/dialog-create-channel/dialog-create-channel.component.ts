import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-dialog-create-channel',
  templateUrl: './dialog-create-channel.component.html',
  styleUrls: ['./dialog-create-channel.component.scss'],
})
export class DialogCreateChannelComponent implements OnInit {
  channelName: any;

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {}


  /**
   * This function calls the chat service to create a new channel.
   */
  createChannel() {
    this.chatService.createNewChannel(this.channelName);
  }
}
