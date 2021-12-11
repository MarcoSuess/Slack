import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { SideNavService } from '../services/sidenav.service';
import { ChatService } from '../shared/chat.service';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  showAdd: boolean;
  @ViewChild('sidenav', { static: false }) public sidenav: MatSidenav | any;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private authService: AuthService,
    private firestore: AngularFirestore,
    public router: Router,
    public chatService: ChatService,
    public dialog: MatDialog,
    public sidenavService: SideNavService
  ) {
    this.showAdd = false;
  }

  async ngOnInit(): Promise<any> {
    await this.userService.loadAllUserData();
    await this.chatService.loadAllChannels();

    await this.route.params.subscribe((params) => {
      console.log(params.id);
      this.userService.loadCurrentUserData(params.id);
    });
  }

  ngAfterViewInit() {
    this.authService.loadScreen = false;
    this.authService.closeErrorMessage();

    if (this.userService.loadCurrentUser) {
      this.userService.saveUserData();
    }

    setTimeout(() => {
      this.loadSideNav();
    }, 1500);
  }

  /**
   * This function declare the sidenav.
   */
  loadSideNav() {
    this.sidenavService.setSidenav(this.sidenav);
    console.log(this.sidenav);
  }



  /**
   * This function check the route if includes chat or channel.
   * 
   * @returns {boolean}
   */
  public checkRouteChannelAndChat() {
    if (this.router.url.includes('chat') || this.router.url.includes('channel'))
      return true;
    else return false;
  }


  /**
   * This function open the create channel dialog.
   */
  openDialog() {
    this.dialog.open(DialogCreateChannelComponent);
  }



  /**
   * This function check the chat or channel for navigate.
   * 
   * @param {any} user 
   */
  goToChat(user: any) {
    if (this.userService.user.uid == 'guest') {
      this.authService.openErrorMessage('You cannot chat privately because you are a guest');
    } else {
      let currentUserUID = this.userService.user.uid;
      var indexOfUserUID = user.privateChatUID.findIndex(function (
        item: any,
        i: any
      ) {
        return item.userUID === currentUserUID;
      });

      if (indexOfUserUID >= 0) {
        this.navigateToChat(user.privateChatUID[indexOfUserUID].chatID);
      } else {
        this.addPrivateChatUID(user);
      }
    }
  }



  /**
   * This function create  a new private chat uid.
   * 
   * @param {any} user 
   */
  addPrivateChatUID(user: any) {
    let pickedUser = {
      chatName: user.displayName,
      userUID: user.uid,
      chatID: this.userService.user.uid + user.uid,
    };
    let currentUser  = {
      chatName: this.userService.user.displayName,
      userUID: this.userService.user.uid,
      chatID: this.userService.user.uid + user.uid,
    };
    this.createPrivateChatCurrentUser(pickedUser);
    this.createPrivateChatPickedUser(user, currentUser);
    this.chatService.createNewChat(this.userService.user.uid + user.uid);
    this.navigateToChat(this.userService.user.uid + user.uid);
  }



  /**
   * This function create the private chat for current user.
   * 
   * @param {any} pickedUser 
   */
  createPrivateChatCurrentUser(pickedUser: any) {
    this.userService.user.privateChatUID.push(pickedUser);
    this.userService.saveUserData();
  } 


  /**
   * This function create the private chat for picked user.
   * 
   * @param {any} user 
   * @param {any} currentUser 
   */
  createPrivateChatPickedUser(user: any, currentUser:any) {
    user.privateChatUID.push(currentUser);
    this.userService.saveOtherUserData(user);
  } 


  /**
   * This  function navigate to the chat.
   * 
   * @param {any} chatUID 
   */
  navigateToChat(chatUID: any) {
    this.chatService.deleteCurrentChatroom();
    this.chatService.saveCurrentChatroom('chats');

    this.router.navigateByUrl(
      '/dashboard/' + this.userService.user.uid + '/chat/' + chatUID
    );
  }


  /**
   * This function navigate to the channel.
   * 
   * @param {any} channel 
   */
  goToChannel(channel: any) {
    this.chatService.deleteCurrentChatroom();
    this.chatService.saveCurrentChatroom('channels');

    this.router.navigateByUrl(
      '/dashboard/' + this.userService.user.uid + '/channel/' + channel.ID
    );
  }
}
