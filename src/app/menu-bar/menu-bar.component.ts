import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogUserStatusComponent } from '../dialog-user-status/dialog-user-status.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  changeText: boolean = false;

  constructor(public userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
  this.dialog.open(DialogUserStatusComponent);

 
  }
}
