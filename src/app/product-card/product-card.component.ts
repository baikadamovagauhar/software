import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RequestService} from "../request.service";
import {take, takeUntil} from "rxjs/operators";
import {CardProductsService} from "../card-products.service";

class ProductToCard {
  id: number;
  title: string;
  price: number;
  barcode: number;
  category_id: number;
  constructor(...models: Partial<ProductToCard>[]) {
    Object.assign(this,...models)
  }
}
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  unsub$ = new Subject();
  categoryList = [];
  popularCategoryList = [];
  popularProductList = [];
  products: any;
  isInCart = false;
  baseUrl = 'http://bb77fa9c.ngrok.io/';

  constructor(
    private http: HttpClient,
    private requestService: RequestService,
    private cardProductsService: CardProductsService ) {
  }

  ngOnInit() {
    this.requestService.getProduct().pipe(takeUntil(this.unsub$)).subscribe((data:any) =>{
      if (data) {
        this.products = data;
        console.log(this.products);
      }
    });
    this.requestService.getCategory().pipe(takeUntil(this.unsub$)).subscribe((data:any)=>{
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

  addToCart() {
   const model: ProductToCard = new ProductToCard({
     title: this.products.title,
     price: this.products.price,
     id: this.products.id,
     barcode: this.products.barcode,
     category_id: this.products.category_id
   });
   let productList: ProductToCard;
   productList = new ProductToCard(model);
   if (!this.isInCart) {
     this.cardProductsService.getProducts(productList);

   }
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
