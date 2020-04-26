import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  providers: [NgbCarouselConfig]
})
export class MainContentComponent implements OnInit, OnDestroy {
  unsub$ = new Subject();
  categoryList = [];
  popularCategoryList = [];
  popularProductList = [];
  storeProducts = [];
  imageUrlArray = [];
  banner = [];
  visibility = false;
  inputNum = [];
  parametr = '';

  baseUrl = 'http://4ebedc28.ngrok.io/';
  constructor(
    private http: HttpClient,
    private requestService: RequestService,
    config: NgbCarouselConfig,
    private activatedRoute: ActivatedRoute) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  // @ViewChild('about') block: ElementRef;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.parametr = params.scrollView;
      // this.scroll(this.block);
    });
    this.imageUrlArray = ['assets/images/slide-1.jpg', 'assets/images/slide-2.jpg', 'assets/images/slide-3.jpg'];

    this.requestService.getCategory().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.categoryList = data;
      }
    });
    this.requestService.getPopularCategories().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.popularCategoryList = data;
        this.banner = data.image;
      }
    });
    this.requestService.getPopularProducts('Алматы, улица Кунаева, 77').pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.popularProductList = data;
        this.popularProductList.forEach(el => {
          this.inputNum.push(1);
        });
      }
    });
    this.requestService.getProductByAddress('Алматы, улица Кунаева, 77').pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.storeProducts = data;
      }
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  scrollTop() {
    scrollTo(0, 0);
  }

  @HostListener( 'window : scroll', [])
  onScroll(): void {
    if (window.innerHeight > window.scrollY) {
      this.visibility = true;
    } else {
      this.visibility = false;
    }
  }
  addToCart(index, product?) {
    const arr = [];
    arr.push(this.popularProductList[index]);
    localStorage.setItem('cart', JSON.stringify(arr));
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
