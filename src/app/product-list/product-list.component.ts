import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  categories = [];
  unsub$: any;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.getCategory().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      this.categories = data;
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
