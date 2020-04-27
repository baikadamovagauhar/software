import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-magaziny',
  templateUrl: './magaziny.component.html',
  styleUrls: ['./magaziny.component.css']
})
export class MagazinyComponent implements OnInit, OnDestroy {
  unsub$ = new Subject();
  shopList = [];
  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.getShopList().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      this.shopList = data;
      console.log(this.shopList);
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
