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
  mobile: boolean = false;
  @ViewChild('sidenav', { static: false }) public sidenav: MatSidenav | any;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private authService: AuthService,
    private firestore: AngularFirestore,
    public router: Router,
    public chatService: ChatService,
    public dialog: MatDialog,
    private sidenavService: SideNavService
  ) {
    this.showAdd = false;
    
  }

  loadSideNav() {
    this.sidenavService.setSidenav(this.sidenav);
    console.log(this.sidenav);
  }

  ngAfterViewInit() {
    this.authService.loadScreen = false;
    this.authService.closeErrorMessage();

    if (this.userService.loadCurrentUser) {
      this.userService.saveUserData();
    }
    setTimeout(() => {
      this.loadSideNav();
    }, 2000);

  }

  async ngOnInit(): Promise<any> {
    console.log(window.screen);

    if (window.screen.width <= 768) {
      this.mobile = true;
      console.log(this.mobile);
    }

    await this.userService.loadAllUserData();
    await this.chatService.loadAllChannels();

    await this.route.params.subscribe((params) => {
      console.log(params.id);
      this.userService.loadCurrentUserData(params.id);
    });
  }

  openDialog() {
    this.dialog.open(DialogCreateChannelComponent);
  }

  goToChat(user: any) {
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

  addPrivateChatUID(user: any) {
    let currentUser = {
      chatName: user.displayName,
      userUID: user.uid,
      chatID: this.userService.user.uid + user.uid,
    };

    let pickedUser = {
      chatName: this.userService.user.displayName,
      userUID: this.userService.user.uid,
      chatID: this.userService.user.uid + user.uid,
    };

    this.userService.user.privateChatUID.push(currentUser);
    this.userService.saveUserData();

    user.privateChatUID.push(pickedUser);
    this.userService.saveOtherUserData(user);

    this.chatService.createNewChat(this.userService.user.uid + user.uid);

    this.navigateToChat(this.userService.user.uid + user.uid);
  }

  navigateToChat(chatUID: any) {
    this.chatService.deleteCurrentChatroom();
    this.chatService.saveCurrentChatroom('chats');

    this.router.navigateByUrl(
      '/dashboard/' + this.userService.user.uid + '/chat/' + chatUID
    );
  }

  goToChannel(channel: any) {
    this.chatService.deleteCurrentChatroom();
    this.chatService.saveCurrentChatroom('channels');

    this.router.navigateByUrl(
      '/dashboard/' + this.userService.user.uid + '/channel/' + channel.ID
    );
  }
}
