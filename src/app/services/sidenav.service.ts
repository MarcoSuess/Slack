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

  /** 
   * This function open the sidenav.
   * 
   * @returns  {any}
   */
  public open() {
    return this.sidenav.open();
  }

  /** 
   * This function close the sidenav.
   * 
   * @returns  {any}
   */
  public close() {
    return this.sidenav.close();
  }


  /** 
   * This function toggle the sidenav.
   * 
   * @returns  {any}
   */
  public toggle(): void {
    return this.sidenav.toggle();
  }
}
