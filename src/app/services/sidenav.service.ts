import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SideNavService {
  public sidenav: MatSidenav | any;
  public loadSideNav: boolean = false;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
    this.loadSideNav = true;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    return this.sidenav.toggle();
  }
}
