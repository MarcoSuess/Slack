import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { ChatService } from '../shared/chat.service';
import { CloudstorageService } from '../shared/services/cloudstorage.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit {
  @ViewChildren('messages')
  messages!: QueryList<any>;
  
  
  @ViewChild('scrollEnd')
  private myScrollContainer!: ElementRef;

  index: any;
  currentThread: any;

  constructor(
    private route: ActivatedRoute,
    public messageComponent: MessageComponent,
    public chatService: ChatService,
    public cloudstorageService: CloudstorageService
  ) {}
 
  ngOnInit(): void {
 

    this.route.params.subscribe((params) => {
      this.index = params.id;
      this.messageComponent.threadIndex = params.id;

      this.currentThread = this.chatService.chat.text[params.id]
      console.log(this.currentThread);
      
    });

    this.messageComponent.scrollToBottom();
  }


  ngAfterViewInit() {
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }



  /**
   * This function scroll the container to the bottom.
   */
  scrollToBottom = () => {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  };
}
