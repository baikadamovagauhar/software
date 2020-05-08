import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import { MyCardComponent } from './my-card/my-card.component';
import { MainContentComponent } from './main-content/main-content.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
import { SliderModule } from 'angular-image-slider';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SlideshowModule} from 'ng-simple-slideshow';
import { ProductListComponent } from './product-list/product-list.component';
import { PartnersComponent } from './partners/partners.component';
import { MagazinyComponent } from './magaziny/magaziny.component';
import { RozygrywComponent } from './rozygryw/rozygryw.component';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DeliveryMapComponent } from './delivery-map/delivery-map.component';
import { RegistrationComponent } from './registration/registration.component';
import {IConfig, NgxMaskModule} from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
    declarations: [
        AppComponent,
        CatalogComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        MyCardComponent,
        MainContentComponent,
        ProductCardComponent,
        ProductListComponent,
        PartnersComponent,
        MagazinyComponent,
        RozygrywComponent,
        DeliveryMapComponent,
        RegistrationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        SliderModule,
        NgbCarouselModule,
        NgbModule,
        SlideshowModule,
        AngularYandexMapsModule.forRoot('9902bad3-29e4-4e16-875a-0d9611ad6ba5'),
        Ng2SearchPipeModule,
        NgxMaskModule.forRoot(maskConfig),
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
