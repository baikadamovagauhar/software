import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ILoadEvent} from 'angular8-yandex-maps';
declare var ymaps: any;

@Component({
  selector: 'app-delivery-map',
  templateUrl: './delivery-map.component.html',
  styleUrls: ['./delivery-map.component.css']
})
export class DeliveryMapComponent implements OnInit, OnDestroy {
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
  shopList = [];
  unsub$ = new Subject();
  constructor(private requestService: RequestService) { }
  ngOnInit() {
    this.requestService.getShopList().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      this.shopList = data;
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
  // var searchControl = new ymaps.control.SearchControl({
  //   options: {
  //     provider: 'yandex#search'
  //   }
  // });
  // var result = searchControl.getResult(0);
  // result.then(function (res) {
  //   console.log("Results " + res );
  // }, function (err) {
  //   console.log("Error");
  // });

}
