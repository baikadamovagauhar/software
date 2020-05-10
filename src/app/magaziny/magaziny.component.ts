import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ILoadEvent} from 'angular8-yandex-maps';

@Component({
  selector: 'app-magaziny',
  templateUrl: './magaziny.component.html',
  styleUrls: ['./magaziny.component.css']
})
export class MagazinyComponent implements OnInit, OnDestroy {
  unsub$ = new Subject();
  shopList = [];
  baseUrl = 'http://e9661ac1.ngrok.io/';
  public placemarkProperties = {
    hintContent: 'Hint content',
    balloonContent: 'Baloon content'
  };
  public placemarkOptions = {
    iconLayout: 'default#image',
    iconImageHref: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconImageSize: [32, 32]
  };
  public parameters = {
    options: {
      size: 'medium',
      position: {
        bottom: 50,
        left: 10
      }
    }
  };

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
