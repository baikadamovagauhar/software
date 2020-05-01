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
  feature = [];
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
  ymaps: any;
  unsub$ = new Subject();
  constructor(private requestService: RequestService, private route: Router) {}
  public onLoad(event: ILoadEvent) {
    this.ymaps = event.ymaps;
    console.log(ymaps.event);
  }
  ngOnInit() {
    this.requestService.getShopList().pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      data.forEach((el) => {
        let temp = {
          geometry: {
            type: 'Rectangle',
            coordinates: [
              [el.lat + 0.01, el.lng + 0.01],
              [el.lat - 0.01, el.lng - 0.01]
            ]
          },
          properties: {
            hintContent: 'Зона доставки',
            balloonContent: el.title
          }
        };
        this.feature.push(temp);
      });
      // this.feature.geometry.coordinates = this.shopCoords;
      console.log(JSON.stringify(this.feature));
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
  click() {
    this.ymaps.geocode('Алматы, ' + this.address)
      .then((res) => {
        console.log(
          res.geoObjects.get(0).properties.get('metaDataProperty')
        );
      });
    // localStorage.setItem('address', 'Алматы, ' + this.address);
    // this.route.navigate(['/main']);
  }
}
