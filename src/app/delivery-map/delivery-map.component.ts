import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ILoadEvent} from 'angular8-yandex-maps';
import {YandexGeoObjectComponent} from 'angular8-yandex-maps/lib/components/yandex-geoobject-component/yandex-geoobject.component';
import {Router} from '@angular/router';
import {log} from 'util';
declare var ymaps: any;

@Component({
  selector: 'app-delivery-map',
  templateUrl: './delivery-map.component.html',
  styleUrls: ['./delivery-map.component.css']
})
export class DeliveryMapComponent implements OnInit, OnDestroy {
  public placemarkProperties = {
    hintContent: 'EzShop',
    balloonContent: 'Our shop'
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
  address: string;
  shopList = [];
  myMap: any;
  unsub$ = new Subject();
  constructor(private requestService: RequestService, private route: Router) {}
  ngOnInit() {
    this.requestService.getShopList().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      this.shopList = data;
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
  click() {
    localStorage.setItem('address', 'Алматы, ' + this.address);
    this.route.navigate(['/main']);
  }
}
