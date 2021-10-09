import { Component, OnInit } from '@angular/core';
import { CloudstorageService } from '../shared/services/cloudstorage.service';

@Component({
  selector: 'app-dialog-profile-settings',
  templateUrl: './dialog-profile-settings.component.html',
  styleUrls: ['./dialog-profile-settings.component.scss']
})
export class DialogProfileSettingsComponent implements OnInit {

  constructor(public cloudstorageService: CloudstorageService) { }

  ngOnInit(): void {
  }


  saveSettings() {
      this.cloudstorageService.uploadImg('users');
  }

}
