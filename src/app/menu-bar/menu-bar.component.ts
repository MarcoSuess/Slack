import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserStatusComponent } from '../dialog-user-status/dialog-user-status.component';
import { DialogProfileSettingsComponent } from '../dialog-profile-settings/dialog-profile-settings.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  changeText: boolean = false;

  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
  
  /**
   * This function open the dialog user status.
   */
  openDialog() {
    this.dialog.open(DialogUserStatusComponent);
  }


  /**
   * This function open the dialog user settings.
   */
  openDialogSettings() {
    this.dialog.open(DialogProfileSettingsComponent);
  }
}
