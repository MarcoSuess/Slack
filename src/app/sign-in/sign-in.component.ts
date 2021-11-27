import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataProtectionComponent } from '../dialog-data-protection/dialog-data-protection.component';
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

  signInGuest() {}




  openDialogDataProtection() {
    this.dialog.open(DialogDataProtectionComponent);
  }


  openDialogLegalNotice() {
    this.dialog.open(DialogLegalnoticeComponent);
  }
}


