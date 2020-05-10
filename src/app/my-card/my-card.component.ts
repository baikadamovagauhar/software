import {Component, OnInit, Input, Output, OnChanges, EventEmitter, OnDestroy} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {CardProductsService} from '../card-products.service';
import {Observable, of, Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';

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

export class MyCardComponent implements OnInit, OnDestroy {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  unsub$ = new Subject();
  item: any;
  data: any;
  address: string;
  total: any;
  checkoutOrder = false;
  isCard: any;
  kvartira: number;
  dom: number;
  name: string;
  surname: string;
  phone: number;
  sdacha: number;
  bonus: any;
  allBonus: any;
  success = false;
  login = true;
  private storageSub = new Subject<string>();
  baseUrl = 'http://e9661ac1.ngrok.io/';
  checkForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/[А-Яа-я]/)]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern(/[А-Яа-я]/)]),
    kv: new FormControl('', [Validators.required]),
    dom: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    sdacha: new FormControl('', [Validators.required])
  });
  constructor(
    private cardProductsService: CardProductsService, private route: Router, private activeRoute: ActivatedRoute,
    private requestService: RequestService) { }

  ngOnInit() {
    this.address = localStorage.getItem('address');
    this.total = this.getTotal();
    this.watchStorage().subscribe((data) => {
      if (data) {
        this.total = this.getTotal();
      }
    });
  }
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }
  onItemChange(value) {
    this.isCard = value === 'card';
  }
  get products() {
    return JSON.parse(localStorage.getItem('cart'));
  }
  getTotal() {
    let total = 0;
    if (this.products) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.products.length; i++) {
        total += parseInt(this.products[i].price, 10) * parseInt(this.products[i].amount, 10);
      }
    }
    return total;
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
      localStorage.setItem('cart', JSON.stringify(this.data));
    }
    this.storageSub.next('true');
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

    localStorage.setItem('cart', JSON.stringify(this.data));
    this.storageSub.next('true');
  }
  clear() {
    localStorage.removeItem('cart');
    this.storageSub.next('true');
    this.route.navigate(
      [],
      {
        relativeTo: this.activeRoute,
        queryParams: { basket: 'clear' },
        queryParamsHandling: 'merge'
      });
  }
  checkout() {
    if (localStorage.getItem('userName')) {
      this.checkoutOrder = !this.checkoutOrder;
    } else {
      this.login = false;
    }
  }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  nextStep() {
    // tslint:disable-next-line:max-line-length
    this.requestService.MakeOrder(this.products, this.total, this.isCard, this.address, this.kvartira, this.dom, this.phone, this.name, this.surname, this.sdacha)
      .pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
        if (data) {
          this.bonus = data;
          this.clear();
          this.success = true;
          this.checkoutOrder = !this.checkoutOrder;
          this.allBonus = parseInt(localStorage.getItem('bonus'));
          this.allBonus += this.bonus;
          localStorage.setItem('bonus', this.allBonus);
        }
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
