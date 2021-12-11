import { Component, OnInit } from '@angular/core';
import { User } from '../shared/services/user';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-dialog-user-status',
  templateUrl: './dialog-user-status.component.html',
  styleUrls: ['./dialog-user-status.component.scss'],
})
export class DialogUserStatusComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}


  /**
   * This function save the user status.
   * 
   * @param {string} status 
   */
  saveStatus(status: string) {
    this.userService.user.status = status;
    this.userService.saveUserData();
  }
}
