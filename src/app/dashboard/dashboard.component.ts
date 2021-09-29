import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../shared/chat.service';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private authService: AuthService,
    private firestore: AngularFirestore,
    public router: Router,
    public chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.authService.loadScreen = false;

    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.userService.loadCurrentUserData(params.id);
    });

    this.userService.loadAllUserData();
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
      userUID: user.uid,
      chatID: this.userService.user.uid + user.uid,
    };

    let pickedUser = {
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
    this.router.navigateByUrl(
      '/dashboard/' + this.userService.user.uid + '/chat/' + chatUID
    );

    console.log('navigate', chatUID);
  }
}
