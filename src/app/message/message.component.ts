import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  text: any;
  @ViewChild('inputText') inputText: any;

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage() {
    console.log(this.text);
    this.inputText.nativeElement.value = '';  
    }


}
