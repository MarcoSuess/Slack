import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  
  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.authService.loadScreen = false;

    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.userService.loadCurrentUserData(params.id);
    });

    this.userService.loadAllUserData();


  }
}
