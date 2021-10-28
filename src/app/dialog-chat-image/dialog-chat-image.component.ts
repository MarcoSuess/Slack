import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-chat-image',
  templateUrl: './dialog-chat-image.component.html',
  styleUrls: ['./dialog-chat-image.component.scss'],
})
export class DialogChatImageComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    
  }

  ngOnInit(): void {}
}
