import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-dialog-channel-settings',
  templateUrl: './dialog-channel-settings.component.html',
  styleUrls: ['./dialog-channel-settings.component.scss']
})
export class DialogChannelSettingsComponent implements OnInit {
  loadBar: boolean = false;


  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }


  /**
   * This function save the edit channel name.
   * 
   * @param {string} name - This is the channel name.
   */
  saveSettings(name: string) {
      this.chatService.chat.name = name;
      this.chatService.updateCurrentChat('channels');
  }

}
