import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {subscribeOn, takeUntil} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  categories = [];
  products = [];
  unsub$ = new Subject();
  private querySubscription: Subscription;
  baseUrl = 'http://7567a78b.ngrok.io/';
  category: any = null;
  inputNum = [];
  isInCart = [];
  arr = [];
  pr = [];
  searchText: string;

  constructor(private requestService: RequestService, private route: ActivatedRoute) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        if (queryParam['ctg']) {
          this.category = queryParam['ctg'];
        } else {
          this.category = null;
        }
        this.getProductByCategory();
      }
    );
  }

  ngOnInit() {
    this.requestService.getCategory().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.categories = data;
      }
    });
  }
  getProductByCategory() {
    this.requestService.getProduct(this.category).pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.products = data;
        this.products.forEach(el => {
          this.inputNum.push(1);
          this.isInCart.push('Добавить');
        });
      }
    });
  }
  addToCart(index, product?) {
    this.arr = [];
    const a = {amount: this.inputNum[index]};
    const merged = Object.assign(this.products[index], a);
    this.isInCart[index] = 'Добавлено';
    this.arr.push(merged);
    let pr = [];
    if (localStorage.getItem('cart')) {
      pr = JSON.parse(localStorage.getItem('cart'));
    }
    let b = pr.concat(this.arr);
    localStorage.setItem('cart', JSON.stringify(b));
  }
  minus(index: number) {
    if (this.inputNum[index] > 1) {
      this.inputNum[index] -= 1;
    } else {
      this.inputNum[index] = 1;
    }
  }
  plus(index: number) {
    this.inputNum[index] += 1;
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
