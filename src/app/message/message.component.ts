import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  text: any;
  @ViewChild('inputText') inputText: any;

  constructor( private route: ActivatedRoute,) { }

  ngOnInit(): void {

    
      this.route.params.subscribe((params) => {
        console.log(params.id);
      /*   this.userService.loadCurrentUserData(params.id); */
      });
  
    
    
  }

  sendMessage() {
    console.log(this.text);
    this.inputText.nativeElement.value = '';  
    }


}
