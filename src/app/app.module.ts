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
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCardComponent } from './product-card/product-card.component';
import { SliderModule } from 'angular-image-slider';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SlideshowModule} from 'ng-simple-slideshow';
import {SlideshowModule} from 'ng-slideshow';

@NgModule({
    declarations: [
        AppComponent,
        CatalogComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        MyCardComponent,
        MainContentComponent,
        ProductCardComponent
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
    SlideshowModule,
    SlideshowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
