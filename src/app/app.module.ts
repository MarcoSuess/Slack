import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { UserComponent } from './user/user.component';
import { MatCardModule } from '@angular/material/card';
import { ContentComponent } from './content/content.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { DialogUserStatusComponent } from './dialog-user-status/dialog-user-status.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessageComponent } from './message/message.component';
import { DialogCreateChannelComponent } from './dialog-create-channel/dialog-create-channel.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogChatImageComponent } from './dialog-chat-image/dialog-chat-image.component';
import { ThreadComponent } from './thread/thread.component';
import { CommonModule } from '@angular/common';
import { DialogProfileSettingsComponent } from './dialog-profile-settings/dialog-profile-settings.component';
import { SideNavService } from './services/sidenav.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogLegalnoticeComponent } from './dialog-legalnotice/dialog-legalnotice.component';
import { DialogDataProtectionComponent } from './dialog-data-protection/dialog-data-protection.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ContentComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    MenuBarComponent,
    DialogUserStatusComponent,
    MessageComponent,
    DialogCreateChannelComponent,
    DialogChatImageComponent,
    ThreadComponent,
    DialogProfileSettingsComponent,
    DialogLegalnoticeComponent,
    DialogDataProtectionComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    PickerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule,
    MatSidenavModule,
    MatProgressBarModule
  ],
  
  providers: [AuthService, SideNavService],
  bootstrap: [AppComponent],
})
export class AppModule {}
