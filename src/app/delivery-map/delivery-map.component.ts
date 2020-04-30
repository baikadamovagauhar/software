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
  feature = null;
  public options = {
    fillColor: '#7df9ff33',
    fillOpacity: 1,
    strokeColor: '#0000FF',
    strokeOpacity: 0.5,
    strokeWidth: 2,
    borderRadius: 6
  };
  address: string;
  shopList = [];
  shopCoords = [];
  myMap: any;
  unsub$ = new Subject();
  constructor(private requestService: RequestService, private route: Router) {}
  ngOnInit() {
    this.requestService.getShopList().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      this.shopList = data;
      let maxLat = Math.max.apply(Math, data.map((o) => o.lat));
      let maxLng = Math.max.apply(Math, data.map((o) => o.lng));
      let temp = [];
      temp.push(maxLat + 0.01);
      temp.push(maxLng + 0.01);
      let minLat = Math.min.apply(Math, data.map((o) => o.lat));
      let minLng = Math.min.apply(Math, data.map((o) => o.lng));
      let temp2 = [];
      temp2.push(minLat - 0.01);
      temp2.push(minLng - 0.01);
      this.shopCoords.push(temp);
      this.shopCoords.push(temp2);
      this.feature = {
        geometry: {
          type: 'Rectangle',
          coordinates: this.shopCoords
        }
      };
      // this.feature.geometry.coordinates = this.shopCoords;
      console.log(JSON.stringify(this.feature));
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
