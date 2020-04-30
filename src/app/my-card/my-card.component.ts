import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {CardProductsService} from '../card-products.service';
import {Observable} from 'rxjs';

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
  item: any;
  data: any;
  baseUrl = 'http://7567a78b.ngrok.io/';

  constructor(private cardProductsService: CardProductsService) { }

  ngOnInit() {}
  get products() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  minus(index: number) {
    if (this.products[index].amount > 0) {
      this.item = {
        image: this.products[index].image,
        title: this.products[index].title,
        price: this.products[index].price,
        amount: this.products[index].amount - 1
      };
      this.data = this.products;
      this.data[index] = this.item;
      console.log(this.data);
      localStorage.setItem('cart', JSON.stringify(this.data));
    }
  }
  plus(index: number) {
    this.item = {
      image: this.products[index].image,
      title: this.products[index].title,
      price: this.products[index].price,
      amount: this.products[index].amount + 1
    };
    this.data = this.products;
    this.data[index] = this.item;
    console.log(this.data);
    localStorage.setItem('cart', JSON.stringify(this.data));
  }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
