import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RequestService} from "../request.service";
import {take, takeUntil} from "rxjs/operators";
import {CardProductsService} from "../card-products.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,OnDestroy {
  unsub$ = new Subject();
  categoryList = [];
  popularCategoryList = [];
  popularProductList = [];
  products: any;
  isInCart = false;
  baseUrl = 'http://d6033da0.ngrok.io/';

  constructor(
    private http: HttpClient,
    private requestService: RequestService,
    private cardProductsService: CardProductsService ) {
  }

  ngOnInit() {
    // this.requestService.getProduct().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
    //   if (data) {
    //     this.products = data;
    //     console.log(this.products);
    //   }
    // });
    this.requestService.getCategory().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.categoryList = data;
      }
    });
    this.requestService.getPopularCategories().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.popularCategoryList = data;
      }
    });
    this.requestService.getPopularProducts('Алматы, улица Кунаева, 77').pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.popularProductList = data;
      }
    });
  }


  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
