import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataprotectionComponent } from '../dialog-dataprotection/dialog-dataprotection.component';
import { DialogLegalnoticeComponent } from '../dialog-legalnotice/dialog-legalnotice.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}


  /**
   * This function sign in the Guest user.
   */
  signInGuest() {
      this.authService.setGuestUserData();

  }




  /**
   * This function open the Dialog data protection.
   */
  openDialogDataProtection() {
    this.dialog.open(DialogDataprotectionComponent);
  }

/**
   * This function open the Dialog legal notice.
   */
  openDialogLegalNotice() {
    this.dialog.open(DialogLegalnoticeComponent);
  }
}


