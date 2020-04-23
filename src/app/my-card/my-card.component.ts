import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {CardProductsService} from "../card-products.service";

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'scale3d(.0, .0, .0)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})

export class MyCardComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  data: any;
  baseUrl = 'http://bb77fa9c.ngrok.io/';

  constructor(private cardProductsService: CardProductsService) { }

  ngOnInit() {
    console.log(this.products);
    this.cardProductsService.cart.subscribe((value) => {
      this.data = value;
    });
  }
  get products() {
    return JSON.parse(localStorage.getItem('cart'));
  }

   close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
