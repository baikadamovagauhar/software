import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardProductsService {
  cart: Observable<any>;
  private basketProducts = new Subject<any>();

  constructor() {
    this.cart = this.basketProducts.asObservable();
  }
  getProducts(data) {
    this.basketProducts.next(data);
  }
}
