import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  constructor(  private route: ActivatedRoute,    private firestore: AngularFirestore,) { }



  ngOnInit(): void {

    this.route.params.subscribe((params) =>{
      console.log(params.id);
      
    })
  }

}
