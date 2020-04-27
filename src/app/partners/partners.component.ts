import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
  providers: [NgbCarouselConfig]
})
export class PartnersComponent implements OnInit {
  popularCategoryList = [];
  popularProductList = [];
  imageUrlArray = [];
  visibility = false;
  inputNum = [];
  parametr = '';
  isInCart = [];

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
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.parametr = params.scrollView;
      // this.scroll(this.block);
    });
    this.imageUrlArray = ['assets/images/slide-1.jpg', 'assets/images/slide-2.jpg', 'assets/images/slide-3.jpg'];
  }
}
