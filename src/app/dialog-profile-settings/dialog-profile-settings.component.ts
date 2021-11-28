import { Component, OnInit } from '@angular/core';
import { CloudstorageService } from '../shared/services/cloudstorage.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dialog-profile-settings',
  templateUrl: './dialog-profile-settings.component.html',
  styleUrls: ['./dialog-profile-settings.component.scss']
})
export class DialogProfileSettingsComponent implements OnInit {

  showAddIcon: boolean = false;

  constructor(public cloudstorageService: CloudstorageService,
   public userService: UserService) { }

  ngOnInit(): void {
    
  }



  saveSettings(nameChange: string, img: any) {
    this.userService.user.displayName = nameChange;
 
      if(img) {
        this.cloudstorageService.uploadImg('users');
      }
    

      this.userService.saveUserData();
  }

}
