import { Component, OnInit } from '@angular/core';
import { User } from '../shared/services/user';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-dialog-user-status',
  templateUrl: './dialog-user-status.component.html',
  styleUrls: ['./dialog-user-status.component.scss']
})
export class DialogUserStatusComponent implements OnInit {

  userStatus: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveStatus() {
    
    if(this.userStatus) {
      this.userService.user.status = this.userStatus;
      this.userService.saveUserData();
    }

    
  }

}
