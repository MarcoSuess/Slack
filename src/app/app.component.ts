import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavService } from './services/sidenav.service';

import { ChatService } from './shared/chat.service';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'slack';

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public chatService: ChatService,
    public sidenav: SideNavService,
    private router: Router
  ) {}

  ngOnInit() {}
  

  /**
   * This function return if the route includes sign.
   * 
   * @returns {any}
   */
  public checkRouteSign() {
    return this.router.url.includes('sign');
  }
}
