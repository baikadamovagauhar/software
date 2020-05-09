import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {CardProductsService} from '../card-products.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  address: string;
  total: number;
  productList: any;
  checkoutOrder = false;
  baseUrl = 'http://d6033da0.ngrok.io/';
  checkForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/[А-Яа-я]/)]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern(/[А-Яа-я]/)]),
    kv: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    dom: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')])
  });

  constructor(private cardProductsService: CardProductsService) { }

  ngOnInit() {
    this.address = localStorage.getItem('address');
    for (let i = 0; i < this.products.length; i++) {
      this.total += this.products[i].price * this.products[i].amount;
    }
  }
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
  clear() {
    localStorage.removeItem('cart');
  }
  checkout() {
    if (localStorage.getItem('userName')) {
      this.checkoutOrder = !this.checkoutOrder;
    } else {
      console.log('ЗАлогинься плиз');
    }
  }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
