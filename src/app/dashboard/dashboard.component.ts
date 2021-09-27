import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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
    public router: Router
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
    console.log(this.userService.user.privateChatUID.length);

    this.userService.user.privateChatUID.forEach((chatuid:any) => {
  
    
        
        if (chatuid == user.privateChatUID) {
          this.navigateToChat();
        } else {
          this.addPrivateChatUID(user);
        }
      
    });



 
  }

  addPrivateChatUID(user: any) {
    let privateChatUID = String(user.uid + this.userService.user.uid);


    this.userService.user.privateChatUID.push(privateChatUID);
    console.log('test');

    user.privateChatUID.push(privateChatUID);
    this.userService.saveUserData();
    this.userService.saveOtherUserData(user);

    console.log(this.userService.user);
  }

  navigateToChat() {
    /*     this.router.navigateByUrl('/dashboard/' + this.currentUserID);
     */

    console.log('navigate');

  }
}
