import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-dialog-create-channel',
  templateUrl: './dialog-create-channel.component.html',
  styleUrls: ['./dialog-create-channel.component.scss']
})
export class DialogCreateChannelComponent implements OnInit {

  channelName: string | undefined;

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }


  createChannel() {
    this.chatService.createNewChannel()
    
  }
}
