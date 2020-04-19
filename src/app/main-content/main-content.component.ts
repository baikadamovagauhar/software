import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

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
  imageUrlArray = [];
  banner = [];
  visibility = false;
  inputNum = 1;

  baseUrl = 'http://77557883.ngrok.io/';
  constructor(private http: HttpClient, private requestService: RequestService, config: NgbCarouselConfig ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
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
    this.requestService.getPopularProducts().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      if (data) {
        this.popularProductList = data;
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
  addToCart(product) {}
  minus() {
    this.inputNum -= 1;
  }
  plus() {
    this.inputNum += 1;
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
