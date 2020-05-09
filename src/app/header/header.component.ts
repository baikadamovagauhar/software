import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDialog = false;
  showBasket = false;
  address: string;
  constructor() {}
    ngOnInit() {
      this.address = localStorage.getItem('address');
  }
  route(el: HTMLElement) {
      el.scrollIntoView();
  }
  toggleBasket() {
    this.showBasket = !this.showBasket;
  }
  toggleDialog() {
    this.showDialog = !this.showDialog;
  }

}
