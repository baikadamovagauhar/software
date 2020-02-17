import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestService} from "../request.service";
import {takeUntil} from "rxjs/operators";
import {Subject,pipe} from "rxjs";


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit, OnDestroy {
  unsub$=new Subject();
  categoryList=[];
  popularCategoryList=[];
  popularProductList=[];
  baseUrl='http://fc5aa445.ngrok.io/';
  constructor(private http:HttpClient,private requestService: RequestService ) {
  }

  ngOnInit() {
    this.requestService.getCategory().pipe(takeUntil(this.unsub$)).subscribe((data:any)=>{
      if(data){
        this.categoryList=data;
      }
    });
    this.requestService.getPopularCategories().pipe(takeUntil(this.unsub$)).subscribe((data:any)=>{
      if(data){
        this.popularCategoryList=data
      }
    });
    this.requestService.getPopularProducts().pipe(takeUntil(this.unsub$)).subscribe((data:any)=>{
      if(data){
        this.popularProductList=data
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
