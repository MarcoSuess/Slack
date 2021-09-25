import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, public userService:UserService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) =>{
      console.log(params.id);
      this.userService.loadUserData(params.id)
    })
  }


}
