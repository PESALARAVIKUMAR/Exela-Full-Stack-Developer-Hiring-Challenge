import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public currentUser: any;
  public enableBillsListView = false;

  constructor() { }

  ngOnInit(): void {
  }

  onUserChange(event: any) {
    if (event) {
      this.currentUser = JSON.parse(event);
    } else {
      this.currentUser = null;
    }
    if (this.currentUser) this.enableBillsListView = true;
  }

}
